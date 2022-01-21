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

router
    .route("/changeInstanceStatus")
    .post(controller.changeInstanceStatus);

router
    .route("/deleteInstance/:id")
    .post(controller.deleteInstance);

router
    .route("/getInstanceByOwnerID/:ownerID")
    .get(controller.getInstanceByOwnerID);
    
router
    .route("/updateInstance")
    .post(controller.updateInstance);
module.exports = router;