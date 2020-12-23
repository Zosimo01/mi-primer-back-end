const { model, Schema } = require("mongoose");

const EventoSchema=Schema({
    title:{
    type:String,
    required:true
    },
    notes:{
        type:String,
    },
    start:{
        type:Date, //objetos de javascript
        required:true,
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        //para ahcer validaciones,
        type:Schema.Types.ObjectId,//le dice ha mongus que va hacer una referencia
        ref:'User_One', //la referencia
        required:true
    }
    
});

EventoSchema.method('toJSON',function(){
    const { __v,_id,...object }=this.toObject();
 
    object.id=_id
    
    return object
})

module.exports=model('evento',EventoSchema);

//para realizar posteo 
//para actualizar
//traer informacion
//etc