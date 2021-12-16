const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cpuSchema = new Schema({
    total: {
        type: Number
    },
    used: {
        type: Number
    }
});

module.exports = mongoose.model("CPU", cpuSchema);