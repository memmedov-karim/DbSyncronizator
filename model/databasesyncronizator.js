const mongoose = require("mongoose");
const {Schema} = mongoose;

const databasesyncronizatorSchema = new Schema({

    syncroner_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'syncroners'
    },
    connection_string:{
        type:String,
        required:true
    },
    allcollections:[{type:String}]

},{timestamps:true});

const Databasesyncronizator = mongoose.model('databasesyncronizator',databasesyncronizatorSchema);

module.exports = Databasesyncronizator;