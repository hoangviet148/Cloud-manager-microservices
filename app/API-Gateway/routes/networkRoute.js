const express = require("express");
const router = express.Router();

const controller = require("../controllers/networkController");

router
    .route("/createNetwork")
    .post(controller.createNetwork);

module.exports = router;