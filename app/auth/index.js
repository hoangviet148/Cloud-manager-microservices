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
        console.log("req:", req)
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
                "tier": req.tier,
                "status": "enable"
            });
            // save user
            await newUser.save();

            // add new user to tier
            let tier = await Tier.findOne({ name: req.tier })
            tier.users.push(newUser._id)
            await tier.save()

            callback(null, { message: "Insert success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { message: error });
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
                tier: user.tier,
                isAdmin: user.role == "admin" ? true : false,
                payment: user.payment
            };

            const token = await jwt.sign(payload, "secret", { expiresIn: "24h" });
            callback(null, { message: token });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    createTier: async (call, callback) => {
        let req = call.request
        console.log("req:" + req.name)
        try {
            const tierExists = await Tier.findOne({ name: req.name });
            console.log("tierExists:" + tierExists)
            if (tierExists) {
                throw "Tier is exists"
            }
            let newTier = new Tier({
                "_id": new mongoose.Types.ObjectId(),
                "name": req.name,
                "cost": req.cost,
                "analytics": req.analytics,
                "users": []
            });
            // save tier
            await newTier.save();
            callback(null, { message: "Create tier success!" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    getListTiers: async (call, callback) => {
        console.log("auth-service - getListTiers")
        console.log("req:" + call)
        try {
            let tiers = await Tier.find();
            callback(null, { tiers: tiers });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    getUserByTier: async (call, callback) => {
        console.log("auth-service - getUserByTier")
        const tier = call.request.message
        console.log("req: ", call)
        try {
            let users = await User.find({ tier: tier });
            callback(null, { users: users });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    changeUserStatus: async (call, callback) => {
        console.log("auth-service - changeUserStatus")
        const id = call.request.message
        console.log("req: ", call)
        try {
            let user = await User.findOne({ _id: id });
            user.status == "enable" ? user.status = "disable" : user.status = "enable"
            await user.save()
            callback(null, { message: "change status ok" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    deleteUserByID: async (call, callback) => {
        console.log("auth-service - deleteUserByID")
        const id = call.request.message
        console.log("req: ", call)
        try {
            let res = await User.deleteOne({ _id: id });
            console.log("res: ", res)
            if (res.deletedCount == 0) {
                throw "User not exist"
            }
            if (res.ok !== 1) {
                throw "Error"
            }
            callback(null, { message: "delete ok" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    updateTierUsers: async (call, callback) => {
        console.log("auth-service - updateTierUsers")
        const tierName = call.request.tier
        const id = call.request.userID
        console.log("req: ", call.request)
        try {
            let tier = await Tier.findOne({ name: tierName });
            console.log("tier: ", tier)
            const index = tier.users.indexOf(id);
            if (index > -1) {
                tier.users.splice(index, 1);
            }
            await tier.save()
            console.log("tier2: ", tier)
            callback(null, { message: "update ok" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    },
    changeUserTier: async (call, callback) => {
        console.log("auth-service - changeUserTier")
        const tierName = call.request.tier
        const id = call.request.userID
        console.log("req: ", call.request)
        try {
            let user = await User.findOne({ _id: id })
            let currentTier = await Tier.findOne({ name: user.tier })
            user.tier = tierName
            await user.save()
            let newTier = await Tier.findOne({ name: tierName });
            newTier.users.push(id);
            await newTier.save()
            //console.log("tier: ", tier)
            const index = currentTier.users.indexOf(id);
            if (index > -1) {
                currentTier.users.splice(index, 1);
            }
            await currentTier.save()
            //console.log("tier2: ", tier)
            callback(null, { message: "update ok" });
        } catch (error) {
            console.log("error: ", error)
            callback(null, { "message": error + " " });
        }
    }
})

app.bind(`auth-service:${port}`, grpc.ServerCredentials.createInsecure())
console.log(`${serviceName} running at port ${port}`)
app.start()