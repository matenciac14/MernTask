const express = require('express');
const connectDB = require('./config/db');

//create the server
const app = express();
//connet to DB
connectDB();

//app port
const PORT = process.envPORT || 4000;

//start app
app.listen(PORT, () =>{
    console.log(`El Servidor esta funcionando en el puerto ${PORT}`);
})
