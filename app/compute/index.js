const grpc = require('grpc')
const mongoose = require("mongoose");
let protoLoader = require("@grpc/proto-loader");
require('dotenv').config();

const app = new grpc.Server()
const port = 8083

const serviceName = 'Compute Service'
const Compute = require("./computeModel");
let packageDefinition = protoLoader.loadSync(process.env.COMPUTE_PROTO_PATH, {})
let computeProto = grpc.loadPackageDefinition(packageDefinition);

// Connect database
const db = "mongodb://mongodb-compute:27017/cloud";
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

app.addService(computeProto.ComputeService.service, {
    createCompute: async (call, callback) => {
        let req = call.request
        console.log("req:" + req)
        try {
            let newCompute = new Compute({
                "hostname": req.hostname,
                "ownerID": req.ownerID,
                "networkID": req.networkID,
                "state": "active",
                "IPv4": req.IPv4,
                "disk": req.disk,
                "ram": req.ram,
                "cpu": req.cpu,
            })

            await newCompute.save();
            callback(null, { message: "Create Compute success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
        }
    }
})

app.bind(`compute-service:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at port ${port}`)
app.start()