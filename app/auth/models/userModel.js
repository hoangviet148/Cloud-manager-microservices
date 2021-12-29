const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    payment: {
        type: String
    },
    tier: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);