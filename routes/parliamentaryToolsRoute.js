const express = require("express");
const router = express.Router();
const parliamentaryToolsController = require("../controllers/parliamentaryToolsController");

router
    .route("/")
    .get(parliamentaryToolsController.getAllParliamentaryTools);

//TAL: shouldn't this path be protected?

router
    .route("/create")
    .post(parliamentaryToolsController.createParliamentaryTool);

    router
    .route("/getToolByType")
    .post(parliamentaryToolsController.getToolByType);


module.exports = router;
