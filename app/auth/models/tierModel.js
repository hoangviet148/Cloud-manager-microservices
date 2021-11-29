const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel")

const tierSchema = new Schema({
    tierName: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
});

module.exports = mongoose.model("Tier", tierSchema);