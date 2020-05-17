const express = require('express');
const connectDB = require('./config/db');

//create the server
const app = express();
//connet to DB
connectDB();

//allow express.json
app.use(express.json({extended:true}));

//app port
const PORT = process.envPORT || 4000;

//import routes
app.use('/api/users',require('./routes/users'))

//start app
app.listen(PORT, () =>{
    console.log(`El Servidor esta funcionando en el puerto ${PORT}`);
})
