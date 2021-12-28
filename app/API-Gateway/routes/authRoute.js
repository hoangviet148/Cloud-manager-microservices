const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");

router
    .route("/register")
    .post(controller.register);

router
    .route("/login")
    .post(controller.login);

router
    .route("/createTier")
    .post(controller.createTier);

router
    .route("/getListTiers")
    .get(controller.getListTiers);

router
    .route("/getUserByTier/:tier")
    .get(controller.getUserByTier);
module.exports = router;