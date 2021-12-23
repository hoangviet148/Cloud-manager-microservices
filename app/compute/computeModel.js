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
    status: {
        type: String
    },
    IPv4: {
        type: String
    },
    disk: {
        type: String
    },
    ram: {
        type: String
    },
    cpu: {
        type: String
    }
});

module.exports = mongoose.model("Compute", computeSchema);