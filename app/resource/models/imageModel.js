const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {
        type: String
    },
    os_type: {
        type: String
    },
    distro: {
        type: String
    },
    version: {
        type: String
    }
});

module.exports = mongoose.model("Image", imageSchema);