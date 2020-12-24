const { response } = require("express")
const Evento = require("../models/Evento")


 const getEvents=async(req,res=response)=>{
     
    console.log(req.body)
const eventoTodo=await Evento.find()
                            .populate('user','name');


    res.status(200).json({
        ok:true,
        msg:'getEvents',
        evento:eventoTodo,
    })
 }

 
 // crear evento
const crearEvento= async (req,res=response)=>{

    const evento=new Evento( req.body );

    try{

        evento.user=req.uid

const guardarEvento= await evento.save();

   res.status(200).json({
        ok:true,
        msg:'crearEvento',
        evento:guardarEvento
    })

    }catch(err){
        console.log(err)
        res.status(401).json({
            ok:false,
            msg:'hable con el administrador'
        })
    
    }
 
}
// actualizar
const actualizarEvento=async(req,res=response)=>{

    const eventoId=req.params.id;
    const uid=req.uid;
   
    try{

        const evento=await Evento.findById( eventoId );

        if( !evento ){
            res.status(200).json({
                ok:false,
                msg:'evento no existe por ese id',
            })                    
        }

        if(evento.user.toString()!==uid){
            return  res.status(401).json({
                ok:false,
                msg:'no tiene privilegio de editar este evnto',
        
            })        
        }

        const nuevoEvento={
            ...req.body,
            user:uid
        }

        const eventoActualizado=await Evento.findByIdAndUpdate( eventoId,nuevoEvento, { new:true } )

   res.status(200).json({
        ok:true,
        msg:'actualizarEvento',
        
        eventoActualizado:eventoActualizado
    })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'hable con el adminastrador'
        })
    
    }
 
}// eliminar
const eliminarEvento=async(req,res=response)=>{


    const eventoId=req.params.id;
    const uid=req.uid;
   
    try{

        const evento=await Evento.findById( eventoId );

        if( !evento ){
            res.status(200).json({
                ok:false,
                msg:'evento no existe por ese id',
            })                    
        }

        if(evento.user.toString()!==uid){
            return  res.status(401).json({
                ok:false,
                msg:'no tiene privilegio de editar este evnto',
        
            })        
        }

        const nuevoEvento={
            ...req.body,
            user:uid
        }

        const eventoActualizado=await Evento.findByIdAndDelete( eventoId)

   res.status(200).json({
        ok:true,
        msg:'evento eliminado',
        
        // eventoActualizado:eventoActualizado
    })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'hable con el adminastrador'
        })
    
    }
 
}

module.exports={
    getEvents,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}

