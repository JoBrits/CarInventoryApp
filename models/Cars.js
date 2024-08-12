const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
    // defined fields we need
    model:{
        type:String,
        required:true
    },
    make:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:String,
        required:true,
        unique:[true, "Reg already exists"]
    },
    address:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Cars', carsSchema);