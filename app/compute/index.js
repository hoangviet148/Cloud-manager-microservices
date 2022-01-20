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
    createInstance: async (call, callback) => {
        let req = call.request
        console.log("req:" + req.networkID)
        try {
            let newCompute = new Compute({
                "_id": new mongoose.Types.ObjectId(),
                "hostname": req.hostname,
                "ownerID": req.ownerID,
                "networkID": req.networkID,
                "status": "running",
                "disk": req.disk,
                "cpu": req.cpu,
                "ram": req.ram,
                "IPv4": req.ip
            })

            await newCompute.save();
            callback(null, { message: "Create Compute success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
        }
    },
    getListInstances: async (call, callback) => {
        console.log("compute-service - getListInstances")
        console.log("req: ", call)
        try {
            let instances = await Compute.find();
            console.log("instances: ", instances)
            callback(null, { instances: instances });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    getInstanceByID: async (call, callback) => {
        let req = call.request
        console.log("req: ", req)
        console.log("compute-service - getInstanceByID")
        try {
            let instance = await Compute.findOne({ _id: req.id });
            console.log("instance: ", instance)
            callback(null, instance);
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    changeInstanceStatus: async (call, callback) => {
        let req = call.request
        console.log("req: ", req)
        console.log("compute-service - changeInstanceStatus")
        try {
            let instance = await Compute.findOneAndUpdate({ _id: req._id }, { status: req.status });
            console.log("instance: ", instance)
            callback(null, { message: "Success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    deleteInstance: async (call, callback) => {
        let req = call.request
        console.log("req: ", req)
        console.log("compute-service - deleteInstance")
        try {
            let res = await Compute.deleteOne({ _id: req.id });
            if (res.deletedCount == 0) {
                throw "Instance not exist"
            }
            console.log("res: ", res)
            callback(null, { message: res.ok });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    getInstanceByOwnerID: async (call, callback) => {
        let req = call.request
        console.log("req: ", req)
        console.log("compute-service - getInstanceByOwnerID")
        try {
            let res = await Compute.find({ ownerID: req.message });

            console.log("res: ", res)
            callback(null, { instances: res });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    }
})

app.bind(`compute-service:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at port ${port}`)
app.start()