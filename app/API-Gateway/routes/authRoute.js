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

router
    .route("/changeUserStatus/:id")
    .get(controller.changeUserStatus);

router
    .route("/deleteUserByID/:id")
    .get(controller.deleteUserByID);

router
    .route("/updateTierUsers")
    .post(controller.updateTierUsers);

router
    .route("/changeUserTier")
    .post(controller.changeUserTier);

module.exports = router;
