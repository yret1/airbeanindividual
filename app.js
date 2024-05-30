const express = require('express');
const connectMongoDB = require("./config/database")

const app = express();



connectMongoDB();

//Middleware


//routes


module.exports = app;



