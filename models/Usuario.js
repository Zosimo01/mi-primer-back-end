const { model, Schema } = require("mongoose");

const userSchema=Schema({
    name:{
    type:String,
    required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    
})
module.exports=model('User_One',userSchema);