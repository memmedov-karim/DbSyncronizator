const { MongoClient } = require('mongodb');
const Syncroner = require('../model/syncroner');
const Test = require('../model/test');
const cron = require('node-cron')
const {cloudinaryUpload} = require("../middleware/fileUpload")
const test = async (req,res,next) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'MongoDB connection URL is required' });
    }
    try {

        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        const db = client.db();
        const collections = await db.listCollections().toArray();

        await client.close();

        res.status(200).json({data:collections.map(collection => collection.name)});
    } catch (error) {
        next(error);
    }
}

const test2 = async (req,res,next) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'MongoDB connection URL is required' });
    }
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        const db = client.db();
        const collections = await db.listCollections().toArray();

        const data = {};
        for (const collection of collections) {
            const collectionData = await db.collection(collection.name).find().toArray();
            data[collection.name] = collectionData;
        }

        await client.close();

        res.status(200).json({data});
    } catch (error) {
        next(error);
    }
}

const fileupload = async (req,res,next) => {
    try {
            const {buffer,originalname} = req.file
            const ress = await cloudinaryUpload(buffer,originalname);
            const cloudinaryUrl = ress.secure_url;
            console.log(ress)
            return res.status(200).json({success:true,message:'Uploaded and did',data:result});
    } catch (error) {
        next(error);
    }
}
const saveuser = async (req,res,next) => {
    try {
        const new_u_instance = new Syncroner(req.body);
        const saved = await new_u_instance.save();
        res.status(200).json({saved});
    } catch (error) {
        next(error);
    }
}



const addtest = async (req,res,next) => {
    try {
        const { name, stock, minute } = req.body;
    const nextUpdate = minute ? new Date(Date.now() + minute * 60000) : null;

    const utser = new Test({
      name,
      stock,
      minute,
      nextUpdate
    });

    await utser.save();

    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
}

// cron.schedule('* * * * *', async () => {
//     console.log("Cron work")
//     try {
//       const now = new Date();
  
//       const users = await Test.find({ nextUpdate: { $lte: now } });
  
//       users.forEach(async (user) => {
//         const { _id, stock, minute } = user;
//         const newStock = stock + 5;
//         const nextUpdate = new Date(Date.now() + minute * 60000);
  
//         await Test.findByIdAndUpdate(_id, { stock: newStock, nextUpdate });
//       });
//     } catch (error) {
//       console.error('Error updating stock:', error.message);
//     }
//   });
module.exports = {
    test,
    test2,
    saveuser,
    addtest,
    fileupload
}