const Syncroner = require("../model/syncroner");
const Databasesyncronizator = require("../model/databasesyncronizator");
const {UserAlreadyExistsWithThisUserNameError} = require("../errors/extends/AlreadyExistsError");
const { UserNotFoundError } = require("../errors/extends/NotFoundError");
const { MongoClient } = require('mongodb');
const saveuser = async (req,res,next) => {

    const {username,password} = req.body;
    try {

        const existingUser = await Syncroner.findOne({username});
        if(existingUser) throw new UserAlreadyExistsWithThisUserNameError(username);
        const new_u_instance = new Syncroner({username,password});
        const saved = await new_u_instance.save();
        res.status(201).json({data:saved,message:"Uğurla qeydiyyatdan keçdiniz."});

    } catch (error) {

        next(error);

    }

}


const useraddnewdbscronizator = async (req,res,next) => {
    const {syncroner_id,connection_string} = req.body;
    try {
        const existingUser = await Syncroner.findById(syncroner_id);
        if(!existingUser) throw new UserNotFoundError();
        const client = new MongoClient(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        const db = client.db();
        const collections = await db.listCollections().toArray();

        await client.close();
        const allcollections = collections.map(collection => collection.name);
        const new_dbsync_instance = new Databasesyncronizator({syncroner_id,connection_string,allcollections});
        const saved = await new_dbsync_instance.save();
        res.status(201).json({data:{...saved._doc,connection_string:"mongodb:******"},message:"Databaza əlaqəsi uğurla əlavə olundu"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    saveuser,
    useraddnewdbscronizator
}