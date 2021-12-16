const grpc = require('grpc')
const mongoose = require("mongoose");
let protoLoader = require("@grpc/proto-loader");
require('dotenv').config();

const app = new grpc.Server()
const port = 8084

const serviceName = 'Resource Service'
//const Network = require("./networkModel");
//let packageDefinition = protoLoader.loadSync(process.env.RESOURCE_PROTO_PATH, {})
//let resourceProto = grpc.loadPackageDefinition(packageDefinition);

// Connect database
const db = "mongodb://mongodb-resource:27017/cloud";
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log("Error in DB connection: " + err);
        } else {
            console.log("MongoDB Connection Succeeded.");
        }
    }
);

// app.addService(resourceProto.ResourceService.service, {
    
// })

app.bind(`resource-service:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at port ${port}`)
app.start()