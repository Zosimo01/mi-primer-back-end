const { validationResult } = require("express-validator");


 const userValidation = (req,res,next) => {
 
    const errores=validationResult( req );

    if(!errores.isEmpty()){
        res.status(401).json({
            ok:true,
            error:errores.mapped(),
        });
    }
next();
}

module.exports={
    userValidation,
}