const mongoose = require("mongoose");
const { schedule } = require("node-cron");
const {Schema} = mongoose;

const backupSchema = new Schema({
    schedule_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    collectionname:{
        type:String,
        required:true
    },
    backup_url:{
        type:String,
        required:true
    }
},{timestamps:true});

const Backup = mongoose.model("backup",backupSchema);

module.exports = Backup;