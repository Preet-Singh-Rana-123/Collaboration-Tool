const express = require("express");
const documentController = require("../controllers/documentConrollers");
const { authenticationToken } = require("../midlleware/jwtMidlleware");

const documentRouter = express.Router();

documentRouter.post(
    "/create",
    authenticationToken,
    documentController.postCreateDocument,
);

documentRouter.post(
    "/join",
    authenticationToken,
    documentController.postJoinDocument,
);

documentRouter.get("/:id", authenticationToken, documentController.getDocument);

module.exports = documentRouter;
