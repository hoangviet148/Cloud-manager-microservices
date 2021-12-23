const express = require("express");
const router = express.Router();

const controller = require("../controllers/computeController");

router
    .route("/createInstance")
    .post(controller.createInstance);

router
    .route("/getListInstances")
    .get(controller.getListInstances);

router
    .route("/getInstanceByID/:id")
    .get(controller.getInstanceByID);

module.exports = router;