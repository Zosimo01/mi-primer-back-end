const {Router}=require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUser,token } = require('../controllers/auth');
const { userValidation } = require('../validation/userValidation');
const { validarJWT } = require('../validation/validarToken');


const route=Router();

route.get(
    '/create',
    [
        check('name','name incorrecto').not().isEmpty(),
        check('email','email incorrecto').isEmail(),
        check('password','password incorrecto').isLength({min:6}),
        userValidation,
    ],
    crearUsuario);
route.post(
    '/',
    [
        check('email','email incorrecto').isEmail(),
        check('password','password incorrecto').isLength({min:6}),
        userValidation,
    ],
    loginUser);
route.get(
    '/token',
    validarJWT,
    token);

module.exports=route
