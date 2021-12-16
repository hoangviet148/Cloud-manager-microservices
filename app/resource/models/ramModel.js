const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ramSchema = new Schema({
    total: {
        type: Number
    },
    avaiable: {
        type: Number
    }
});

module.exports = mongoose.model("Ram", ramSchema);