const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel")

const tierSchema = new Schema({
    name: {
        type: String
    },
    cost: {
        type: String
    },
    maxIOPerSec: {
        type: Number
    },
    analytics: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: User
    }],
    pricingDetail: [{
        type: String
    }]
});

module.exports = mongoose.model("Tier", tierSchema);