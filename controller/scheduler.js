const Scheduler = require("../model/scheduler");
const Backup = require("../model/backup");
const Databasesyncronizator = require("../model/databasesyncronizator");
const {DataBaseSyncronizatorNotFoundError} = require("../errors/extends/NotFoundError");
const {uploadmultiplefile} = require("../helper/mongocollectionsrelation");
const cron = require('node-cron')
const addscheduler = async (req,res,next) => {
    try {
        const {databasesyncronizator_id,syncronization_interval_minute,collections} = req.body;
        const existingDatabasesyncronizator = await Databasesyncronizator.findById(databasesyncronizator_id);
        if(!existingDatabasesyncronizator) throw new DataBaseSyncronizatorNotFoundError();
        const new_scheduler_instance = new Scheduler({databasesyncronizator_id,syncronization_interval_minute,collections});
        const saved_scheduler = await new_scheduler_instance.save();
        res.status(201).json({data:saved_scheduler,message:"Proses uğurla əlavə olundu"});
    } catch (error) {
        next(error);
    }
}



cron.schedule('* * * * *', async () => {
    console.log("Cron work")
    try {
      const now = new Date();
  
      const schedules = await Scheduler.aggregate([
        {$match:{ next_update_time: { $lte: now } }},
        {
            $lookup:{
                from:"databasesyncronizators",
                localField:"databasesyncronizator_id",
                foreignField:"_id",
                as:"databasesyncronizatorinfo"
            }
        },
        {
            $unwind:"$databasesyncronizatorinfo"
        }
      ]);
    //   console.log(schedules)
      schedules.forEach(async (schedule) => {
        const { _id, syncronization_interval_minute,collections,databasesyncronizatorinfo } = schedule;
        const {connection_string} = databasesyncronizatorinfo;
        const backupUrls = await uploadmultiplefile(connection_string, collections);
        for (let { collectionname, backupUrl } of backupUrls) {
            const new_backup_instance = new Backup({
                schedule_id: _id,
                collectionname,
                backup_url: backupUrl
            });
            await new_backup_instance.save();
        }

        const nextUpdate = new Date(now.getTime() + syncronization_interval_minute * 60000);

        await Scheduler.findByIdAndUpdate(_id, { next_update_time: nextUpdate });
      });
    } catch (error) {
      console.error('Error updating stock:', error.message);
    }
  });
module.exports = {
    addscheduler
}