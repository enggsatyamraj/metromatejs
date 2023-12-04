const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    source:{
        type:String, 
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    timeStamp:{
        type:Date,
        required:true,
        default:Date.now,
    }
})

module.exports = mongoose.model("History",historySchema);