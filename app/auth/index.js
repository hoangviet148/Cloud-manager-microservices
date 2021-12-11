const grpc = require('grpc')
const mongoose = require("mongoose");
let protoLoader = require("@grpc/proto-loader");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = new grpc.Server()
const port = 8081

const serviceName = 'Auth Service'
const User = require("./models/userModel");
const Tier = require("./models/tierModel");
let packageDefinition = protoLoader.loadSync(process.env.AUTH_PROTO_PATH, {})
let authProto = grpc.loadPackageDefinition(packageDefinition);

// Connect database
const db = "mongodb://mongodb-auth:27017/cloud";
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

app.addService(authProto.AuthService.service, {
    register: async (call, callback) => {
        let req = call.request
        console.log("req:" + req)
        try {
            const emailExists = await User.findOne({ email: req.email });
            console.log("emailExists:" + emailExists)
            if (emailExists) {
                throw "Email is exists"
            }
            // save user
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(req.password, salt);
            let newUser = new User({
                "_id": new mongoose.Types.ObjectId(),
                "username": req.username,
                "password": hash,
                "role": req.role,
                "email": req.email,
                "phone": req.phone,
                "payment": req.payment,
                "tier": req.tier
            });
            // save user
            await newUser.save();

            // add new user to tier
            let tier = await Tier.findOne({ tierName: req.tier })
            tier.users.push(newUser._id)
            await tier.save()

            callback(null, { message: "Insert success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error + " " });
        }
    },
    login: async (call, callback) => {
        console.log(call.request)
        try {
            const email = call.request.email;
            const password = call.request.password;
            const user = await User.findOne({ email: email });
            if (!user) {
                throw "Email not found"
            }
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                throw "Password is wrong"
            }
            const payload = {
                userId: user._id,
                created: new Date(),
                user: user,
            };

            const token = await jwt.sign(payload, "secret", { expiresIn: "24h" });
            callback(null, { message: token });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error });
        }
    }
})

app.bind(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at http://192.168.75.121:${port}`)
app.start()