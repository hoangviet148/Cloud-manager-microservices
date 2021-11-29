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
console.log(process.env.AUTH_PROTO_PATH)
let packageDefinition = protoLoader.loadSync(process.env.AUTH_PROTO_PATH, {})
let authProto = grpc.loadPackageDefinition(packageDefinition);

// Connect database
const db = "mongodb://127.0.0.1:27015/cloud";
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
        console.log(call.request)
        try {

            const emailExists = await User.findOne({ email: email });
            if (emailExists) {
                callback(null, "Email is exists")
            }
            // save user
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(password, salt);
            let user = call.request;
            let newUser = new User({
                userId: user.userId,
                products: user.products,
                password: hash
            });
            await newUser.save();
            callback(null, newUser);
        } catch (error) {
            console.log(error + " ")
            callback(null, error);
        }
    },
    login: async (call, callback) => {
        console.log(call.request)
        try {
            const email = call.request.email;
            const password = call.request.password;
            const user = await User.findOne({ email: email });
            if (!user) {
                callback(null, { email: "Email not found" });
            }
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                callback(null, { email: "Password is wrong" });
            }
            const payload = {
                userId: user._id,
                created: new Date(),
                user: user,
            };

            const token = await jwt.sign(payload, "secret", { expiresIn: "24h" });
            callback(null, { token: token });
        } catch (error) {
            console.log(error + " ")
            callback(null, error);
        }
    }
})

app.bind(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at http://192.168.75.121:${port}`)
app.start()