const express =require('express');
const dbConect = require('./database/config');
const cors =require('cors');
require('dotenv').config();

const app=express();



//leer lectura de body

app.use( express.json() ) 
//congi  data base
dbConect()
//cors
app.use(cors());
//ruta publica
app.use(express.static('public'));
// rutas de usuario
app.use('/user/auth',require('./routers/auth'))
app.use('/user/event',require('./routers/events'))



app.listen(process.env.PORT,()=>{
    console.log( `${ process.env.PORT }` )
})