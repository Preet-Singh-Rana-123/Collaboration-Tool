const express = require("express");
const userController = require("../controllers/userControllers");
const { authenticationToken } = require("../midlleware/jwtMidlleware");

const userRouter = express.Router();

userRouter.get("/profile", authenticationToken, userController.getUser);
userRouter.put("/profile", authenticationToken, userController.updateUser);

module.exports = userRouter;
