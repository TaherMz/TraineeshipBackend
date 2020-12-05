const express = require("express");
const posterController = require("../controllers/posterController");
const router = express.Router();

router
  .route("/")
  .post(posterController.PostInOffer)
router
  .route("/getAllmyoffers/:nom")
  .get(posterController.getAllMyOffers)

module.exports = router;
