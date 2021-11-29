const mongoose = require("mongoose");
const Tier = require("./tierModel")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    payment: {
        type: String
    },
    tier: {
        type: Schema.Types.ObjectId,
        ref: Tier
    }
});

module.exports = mongoose.model("User", userSchema);