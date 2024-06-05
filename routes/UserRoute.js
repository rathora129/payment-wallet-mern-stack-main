import express from "express";
import UserController from "../controllers/UserController.js";

export const userRoute = express.Router();
userRoute.post("/register", UserController.registerUser);
userRoute.post("/login", UserController.loginUser);
