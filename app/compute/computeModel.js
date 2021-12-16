const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const computeSchema = new Schema({
    hostname: {
        type: String
    },
    ownerID: {
        type: String
    },
    networkID: {
        type: String
    },
    state: {
        type: String
    },
    IPv4: {
        type: String
    },
    disk: {
        type: Number
    },
    ram: {
        type: Number
    },
    cpu: {
        type: Number
    }
});

module.exports = mongoose.model("Compute", computeSchema);