const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userControllers");
const  verify = require("../middleware/verifyCookie");


//TAL: shouldn't most routes here be protected?
router
  .route("/login")
  .post(userController.Login);

  router
  .route("/registration")
  .post(userController.Registration);

  router
  .route("/forgetPassword")
  .post(userController.ForgetPassword);

  router
  .route("/savePassword")
  .post(userController.SavePassword);

  router
  .route("/deleteCookie")
  .post(userController.DeleteCookie);

  router
  .route("/getUsersByType")
  .get(userController.GetUsersByType);

  router
  .route("/checkConnection")
  .post(userController.CheckConnection);

  router
  .route("/getAllKnessetMembers")
  .get(userController.getAllKnessetMembers);

module.exports = router;