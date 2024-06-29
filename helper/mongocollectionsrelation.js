const { MongoClient } = require('mongodb');
const {cloudinaryUpload} = require("../middleware/fileUpload");
const { format } = require('date-fns');
const getdatafromconnectionstring = async (connectionstring,collectionname) => {
    const client = new MongoClient(connectionstring, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db();
        const collectionData = await db.collection(collectionname).find().toArray();
        await client.close();
        return collectionData;
        
    } catch (error) {
        await client.close();
        throw error;
    }
}

const uploadfile = async (connectionstring,collectionname) => {
    try {
        const data = await getdatafromconnectionstring(connectionstring,collectionname);
        const jsonString = JSON.stringify(data);
        const buffer = Buffer.from(jsonString);
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy MMM dd HH:mm:ss');
        const uploadResult = await cloudinaryUpload(buffer,collectionname, `${collectionname}-${formattedDate}.json`);
        return uploadResult?.secure_url;
    } catch (error) {
        throw error;
    }
}

const uploadmultiplefile = async (connectionstring, collectionnames) => {
    const backupUrls = [];
    for (let collectionname of collectionnames) {
        const backupUrl = await uploadfile(connectionstring, collectionname);
        backupUrls.push({ collectionname, backupUrl });
    }
    return backupUrls;
};
module.exports = {
    getdatafromconnectionstring,
    uploadfile,
    uploadmultiplefile
}