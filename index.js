const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');


//servidor express  
const app= express();

//db connection
dbConnection();


//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//RUTAS
app.use('/api/auth', require('./routes/auth'));
 

 


app.listen(process.env.PORT, () => {}); 