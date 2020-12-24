const jwt =require('jsonwebtoken');

//jwt trabaja con el uso de callback
//pero se puede trabajar creando un anueva promesa
const generarJWT=(uid,name)=>{
    return new Promise((resolve,reject)=>{
        
        const payload={uid,name};

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{ 
            
            expiresIn:'2h' //expirara en dos hours

        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve( token )
        }
        )
    })
}

module.exports={
    generarJWT
}