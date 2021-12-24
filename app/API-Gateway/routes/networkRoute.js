const express = require("express");
const router = express.Router();

const controller = require("../controllers/networkController");

router
    .route("/createNetwork")
    .post(controller.createNetwork);

router
    .route("/getAllNetworks")
    .get(controller.getAllNetworks);
module.exports = router;