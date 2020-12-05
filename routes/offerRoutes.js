const express = require("express");
const offerController = require("../controllers/offerController");
const router = express.Router();

router
  .route("/")
  .post(offerController.createOffer)
  .get(offerController.getAllOffers)

router
  .route("/:offerId")
  .get(offerController.getOffer)
  .delete(offerController.deleteOffer)
  .patch(offerController.updateOffer);
router
  .route("/getmyoffers/:nomsociete")
  .get(offerController.getMyOffers)

module.exports = router;
