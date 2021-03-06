const express = require("express");
const posterController = require("../controllers/posterController");
const router = express.Router();

router
  .route("/")
  .post(posterController.PostInOffer)
  .get(posterController.getAllOffersposted)
  router
  .route("/:posterId")
  .patch(posterController.updatePoster)
  .delete(posterController.deletePost)
router
  .route("/getAllmyoffers/:nom")
  .get(posterController.getAllMyOffers)

module.exports = router;
