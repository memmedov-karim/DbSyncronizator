const mongoose = require("mongoose");
const {Schema} = mongoose;

const testSchema = new Schema({
    name:{
        type:String
    },
    minute:{
        type:Number,
        default:null
    },
    stock:{
        type:Number
    },
    nextUpdate:{
        type:Date,
        default:null
    }
},{timestamps:true});

const Test = mongoose.model("test",testSchema);
module.exports = Test;