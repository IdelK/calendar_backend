const express = require('express');
require('dotenv').config();
//const {dbConnection} = require('./database/config');


//servidor express  
const app= express();
//db connection
//dbConnection();

//RUTAS

//directorio publico
app.use(express.static('public'));

//rutas del login
app.use('/api/auth', require('./routes/auth'));
 

 


app.listen(process.env.PORT, () => {}); 