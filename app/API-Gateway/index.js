const express = require('express')
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const events = require('events');
require('dotenv').config();

const app = express()
const port = 8080
const serviceName = 'API Gateway'

const authRoute = require("./routes/authRoute");
// const orderRoute = require("./routes/orderRoute");
// const productRoute = require("./routes/productRoute");

// Middleware
app.use(
    bodyParser.json({
        limit: "50mb",
    })
);
app.use(logger("dev"));
app.use(cors());

// Router
app.use("/api/auth", authRoute);

let emitter = new events.EventEmitter();
emitter.setMaxListeners(0)
process.setMaxListeners(0)
app.listen(port, () => console.log(`Service ${serviceName} listening on port ${port}!`))