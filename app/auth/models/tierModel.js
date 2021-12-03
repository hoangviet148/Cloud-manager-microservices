const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel")

const tierSchema = new Schema({
    tierName: {
        type: String
    },
    cost: {
        type: String
    },
    MaxIOPerSec: {
        type: Number
    },
    Analytics: {
        type: String
    },
    MaxRamPerCompute: {
        type: Number
    },
    CPU: [{
        type: String
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
});

module.exports = mongoose.model("Tier", tierSchema);