const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

//create the server
const app = express();
//connet to DB
connectDB();

//allow cors
app.use(cors())

//allow express.json
app.use(express.json({extended:true}));

//app port
const PORT = process.envPORT || 4000;

//import routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/projects',require('./routes/project'));
app.use('/api/tasks',require('./routes/task'));

//start app
app.listen(PORT, () =>{
    console.log(`El Servidor esta funcionando en el puerto ${PORT}`);
})
