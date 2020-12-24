const mongoose = require("mongoose");

const dbConect=async()=>{
    try{

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true
        });
        
    }catch(err){
        console.log(err);
        throw new Error('fallas de inizializacion con mongoose "config "')
    }

}

module.exports=dbConect
