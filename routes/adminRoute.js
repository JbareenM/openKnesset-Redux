const express = require("express");
const router = express.Router();
const AdminController = require("./../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");

router
.route("/getAllMembers")
.get(verifyAdmin, AdminController.getAllMembers);

router
.route("/getBlockedMembers")
.get(verifyAdmin, AdminController.getBlockedMembers);

router
.route("/getActiveMembers")
.get(verifyAdmin, AdminController.getActiveMembers);

router
.route("/changeStatus")
.post(verifyAdmin, AdminController.changeStatus);

router
.route("/checkSpam")
.get(verifyAdmin, AdminController.checkSpam);

router
.route("/allSuggestions")
.get(verifyAdmin, AdminController.allSuggestions);

router
.route("/notSpam")
.get(verifyAdmin, AdminController.notSpam);

router
.route("/changeSpam")
.post(verifyAdmin, AdminController.changeSpam);

router
.route("/addMember")
.post(verifyAdmin, AdminController.addMember);


router
.route("/getMemberByEmail")
.post(verifyAdmin, AdminController.getMemberByEmail);

router
.route("/getSuggestionsByUserSuggest")
.post(verifyAdmin, AdminController.getSuggestionsByUserSuggest);

router
.route("/getMemberByFirstLastName")
.post(verifyAdmin, AdminController.getMemberByFirstLastName);

module.exports = router;
