const express = require("express");
const { connectToMongoDB } = require("./config/database");

const routes = require("./routes/routes");

const app = express();

connectToMongoDB();

app.use(express.json());

app.use("/", routes);

module.exports = app;
