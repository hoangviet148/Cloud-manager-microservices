const grpc = require('grpc')
const mongoose = require("mongoose");
let protoLoader = require("@grpc/proto-loader");
require('dotenv').config();

const app = new grpc.Server()
const port = 8082

const serviceName = 'Network Service'
const Network = require("./networkModel");
let packageDefinition = protoLoader.loadSync(process.env.NETWORK_PROTO_PATH, {})
let networkProto = grpc.loadPackageDefinition(packageDefinition);

// Connect database
const db = "mongodb://mongodb-network:27017/cloud";
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

app.addService(networkProto.NetworkService.service, {
    createNetwork: async (call, callback) => {
        let req = call.request
        console.log("req:", req)
        try {
            const networkExists = await Network.findOne({ IPv4: req.IPv4 });
            console.log("networkExists:" + networkExists)
            if (networkExists) {
                throw "Network is exists"
            }

            let newNetwork = new Network({
                "ownerID": req.ownerID,
                "name": req.name,
                "status": req.status,
                "IPv4": req.IPv4,
                "dhcp": req.dhcp,
                "ip_forward": req.ipForward
            })
            // save network
            await newNetwork.save();
            callback(null, { message: "Create network success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
        }
    },
    getAllNetworks: async (call, callback) => {
        console.log("req:" + call.request)
        try {
            const networks = await Network.find();
            console.log("networks:" + networks)

            callback(null, { networks: networks });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
        }
    },
    deleteNetworkByID: async (call, callback) => {
        console.log("req:" , call.request)
        try {
            const res = await Network.deleteOne({ _id: call.request.message });
            console.log("res:" + res)
            if (res.deletedCount == 0) {
                throw "Network not exist!"
            }

            callback(null, { message: res.ok });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
        }
    },
    changeNetworkStatus: async (call, callback) => {
        console.log("req:" , call.request)
        try {
            const network = await Network.findOne({ _id: call.request.message });
            network.status === "active" ? network.status = "stop" : network.status = "active";
            console.log(network)
            await network.save()
            callback(null, { message: "status change success" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
        }
    }
})

app.bind(`network-service:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at port ${port}`)
app.start()