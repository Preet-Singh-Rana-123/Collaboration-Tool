const express = require("express");
const dashboardControllers = require("../controllers/dashboardControllers");
const { authenticationToken } = require("../midlleware/jwtMidlleware");

const dasboardRouter = express.Router();

dasboardRouter.get(
    "/document",
    authenticationToken,
    dashboardControllers.getDocument,
);

module.exports = dasboardRouter;
