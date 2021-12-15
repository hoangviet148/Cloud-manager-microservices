const express = require("express");
const router = express.Router();

const controller = require("../controllers/computeController");

router
    .route("/createCompute")
    .post(controller.createCompute);

module.exports = router;