const express = require("express");
const authControllers = require("../controllers/authControllers");
const { authenticationToken } = require("../midlleware/jwtMidlleware");

const authRouter = express.Router();

authRouter.post("/login", authControllers.postLogin);
authRouter.post("/register", authControllers.postRegister);

module.exports = authRouter;
