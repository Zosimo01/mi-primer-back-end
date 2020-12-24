const {Router}=require('express');
const { check } = require('express-validator');
const { getEvents,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/eventos');
const { validarJWT }=require('../validation/validarToken')
const { isDate } =require('../helpers/isDate');
const { userValidation } = require('../validation/userValidation');

const router=Router();
//todas mis rutas por validacion
router.use( validarJWT )

router.get(
    '/',
    [
        check('title','el titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatorio').custom( isDate ),
        check('end','fecha de finalizacion es obligatorio').custom( isDate ),
        userValidation
    ],
    getEvents);
router.post(
    '/',
    [
        check('title','el titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatorio').custom( isDate ),
        check('end','fecha de finalizacion es obligatorio').custom( isDate ),
        userValidation
    ],
    crearEvento);
router.put(
    '/:id',
    [
        check('title','el titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatorio').custom( isDate ),
        check('end','fecha de finalizacion es obligatorio').custom( isDate ),
        userValidation
    ],
    actualizarEvento);
router.delete(
    '/:id',
    // [
    //     check('title','el titulo es obligatorio').not().isEmpty(),
    //     check('start','fecha de inicio es obligatorio').custom( isDate ),
    //     check('end','fecha de finalizacion es obligatorio').custom( isDate ),
    //     userValidation
    // ],
    eliminarEvento);

module.exports=router