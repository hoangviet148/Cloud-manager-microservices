const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema({
    ownerID: {
        type: String
    },
    name: {
        type: String
    },
    status: {
        type: String
    },
    IPv4: {
        type: String
    },
    ip_forward: {
        type: String
    },
    dhcp: {
        type: Boolean
    }
});

module.exports = mongoose.model("Network", networkSchema);