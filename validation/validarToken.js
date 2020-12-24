const {response}=require('express');
const jwt =require('jsonwebtoken');
const validarJWT=(req,res=response,next)=>{

//x-token
const token=req.header('x-token');

if(!token){//si el token no viene (null)
    return res.status(401).json({
        ok:false,
        msg:'No hay token en la peticon'
    });
}

try{
//si el token es correcto
    const payload=jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );

    req.uid=payload.uid;
    req.name=payload.name;


}catch(err){
    return res.status(401).json({
        ok:false,
        msg:'token no valido',
    })
}

next();
}

module.exports={
    validarJWT
}