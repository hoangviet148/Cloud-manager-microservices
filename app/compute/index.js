const grpc = require('grpc')
const mongoose = require("mongoose");
let protoLoader = require("@grpc/proto-loader");
require('dotenv').config();
const authClient = require("./grpc-client/auth/authClient")
const networkClient = require("./grpc-client/network/networkClient")

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

        try {
            console.log("slo")
            let network = await networkClient.getNetworkByID({ message: req.networkID })
            let ip = network.IPv4.slice(0, network.IPv4.length - 4)
            ip += (Math.floor(Math.random() * 252) + 2);
            console.log("network: ", ip)

            let newCompute = new Compute({
                "_id": new mongoose.Types.ObjectId(),
                "hostname": req.hostname,
                "ownerID": req.ownerID,
                "networkID": req.networkID,
                "status": "running",
                "disk": req.disk,
                "cpu": req.cpu,
                "ram": req.ram,
                "IPv4": ip
            })
            let tier = await authClient.getTierByUserID({ message: req.ownerID })
            let instances = await Compute.find({ ownerID: req.ownerID });

            let UsedRam = 0;
            instances.forEach(item => {
                UsedRam += parseInt(item.ram)
            })

            let UsedDisk = 0;
            instances.forEach(item => {
                UsedDisk += parseInt(item.disk)
            })

            let UsedCpu = 0;
            instances.forEach(item => {
                UsedCpu += parseInt(item.cpu)
            })

            if ((parseInt(req.cpu) + UsedCpu) > parseInt(tier.pricingDetail[2])) throw "Reach limit number of cpu error!"
            if ((parseInt(req.ram) + UsedRam) > parseInt(tier.pricingDetail[1])) throw "Reach limit number of ram error!"
            if ((parseInt(req.disk) + UsedDisk) > parseInt(tier.pricingDetail[0])) throw "Reach limit storage error!"
            if (instances.length >= parseInt(tier.pricingDetail[3])) throw "Reach limit number of instance error!"

            console.log("res:", UsedRam, UsedDisk, UsedCpu, tier.pricingDetail[2])
            await newCompute.save();
            callback(null, { message: "Create Compute success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
        }
    },
    updateInstance: async (call, callback) => {
        let req = call.request
        console.log("req: ", req)
        try {
            let tier = await authClient.getTierByUserID({ message: req.ownerID })
            let instances = await Compute.find({ ownerID: req.ownerID });
            let instance = await Compute.findOne({ _id: req.id })

            let UsedRam = 0;
            instances.forEach(item => {
                UsedRam += parseInt(item.ram)
            })

            let UsedDisk = 0;
            instances.forEach(item => {
                UsedDisk += parseInt(item.disk)
            })

            let UsedCpu = 0;
            instances.forEach(item => {
                UsedCpu += parseInt(item.cpu)
            })

            if ((parseInt(req.cpu) - parseInt(req.cpu) + UsedCpu) > parseInt(tier.pricingDetail[2])) throw "Reach limit number of cpu error!"
            if ((parseInt(req.ram) - parseInt(req.ram) + UsedRam) > parseInt(tier.pricingDetail[1])) throw "Reach limit number of ram error!"
            if ((parseInt(req.disk) - parseInt(req.disk) + UsedDisk) > parseInt(tier.pricingDetail[0])) throw "Reach limit storage error!"

            instance.hostname = req.hostname
            instance.disk = req.disk
            instance.ram = req.ram
            instance.cpu = req.cpu
            await instance.save();
            callback(null, { message: "Update Compute success!" });
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