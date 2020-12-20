const express = require("express");
const { mailing } = require("../controllers/userController");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.Mailer)

router
  .route("/:userId")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);




module.exports = router;
