const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema({
    ownerID: {
        type: String
    },
    name: {
        type: String
    },
    state: {
        type: String
    },
    IPv4: {
        type: String
    }
});

module.exports = mongoose.model("Network", networkSchema);