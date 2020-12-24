const { response } =require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { use } = require('../routers/auth');
const { generarJWT } = require('../helpers/jsonWebToken');

const crearUsuario=async(req,res=response)=>{
    const {email,password }=req.body;
try{

    let user=await Usuario.findOne({email});
    if(user){
        res.status(400).json({
            ok:false,
             grabado:'el usuario ya existe'   
        });
    }

    user=new Usuario(req.body);
//encriptar password
const salt =bcrypt.genSaltSync();
user.password=bcrypt.hashSync(password,salt);
    await user.save();

//token
const token =await generarJWT(user.id,user.name)

//true
    res.status(201).json({
        ok:true,
         grabado:'useres',
         token   
    });
}catch(err){
    console.log( err )
    res.status(500).json({
        ok:false,
         grabado:'hable con el adminstrador'   
    });

}
}

const loginUser=async(req,res)=>{

        const { email,password }=req.body;
        try{
            let user=await Usuario.findOne({email});//01

            if(!user){ //si user email no existe
               return res.status(400).json({
                    ok:false,
                     grabado:'no se encontro el email'   
                });
            }

        
             //confirmar password
            const validPassword=bcrypt.compareSync(password,user.password);//02

            if(!validPassword){//incorrecto
                return  res.status(400).json({
                         ok:false,
                         grabado:'password incorrecto'   
                         });
            }
        //token
const token =await generarJWT(user.id,user.name)
            res.status(200).json({//03
                ok:true,
                 grabado:'iniciando login',
                  uid:user.id,
                  name:user.name, 
                  token,
            });

        }catch(err){
            console.log(err);
            res.status(500).json({
                ok:false,
                msg:'hable con el administrador'
            });        
        }

}

const token=async(req,res)=>{

    const uid=req.uid;
    const name=req.name;
    const token=await generarJWT(uid,name)

    res.json({
        ok:true,
        token
    });
}

module.exports={
    crearUsuario,
    loginUser,
    token,
}