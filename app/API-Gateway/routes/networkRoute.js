const express = require("express");
const router = express.Router();

const controller = require("../controllers/networkController");

router
    .route("/createNetwork")
    .post(controller.createNetwork);

router
    .route("/getAllNetworks")
    .get(controller.getAllNetworks);

router
    .route("/deleteNetworkByID/:id")
    .get(controller.deleteNetworkByID);

router
    .route("/changeNetworkStatus/:id")
    .get(controller.changeNetworkStatus);
module.exports = router;