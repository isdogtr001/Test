const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const projectRoutes = require('./api/routes/project.js');
const taskRoutes = require('./api/routes/Task.js');
const subtaskRoutes = require('./api/routes/SubTask.js');
const userRoutes = require('./api/routes/User.js');
const imageRoutes = require('./api/routes/image.js');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(
    //'mongodb+srv://joaza01:' + process.env.MONGO_ATLAS_PW + ' @cluster0-c1pyw.mongodb.net/test?retryWrites=true',

    // 'mongodb://joaza01:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-c1pyw.mongodb.net:27017,cluster0-shard-00-01-c1pyw.mongodb.net:27017,cluster0-shard-00-02-c1pyw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    // { useNewUrlParser: true }

    'mongodb+srv://Joa:'+ process.env.MONGO_ATLAS_PW + '@cluster0-xjctn.gcp.mongodb.net/test?retryWrites=true&w=majority',
   
    { useUnifiedTopology: true , useNewUrlParser: true }

);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/project', projectRoutes);
app.use('/task', taskRoutes);
app.use('/subtask', subtaskRoutes);
app.use('/user', userRoutes);
app.use('/image', imageRoutes);
 


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;