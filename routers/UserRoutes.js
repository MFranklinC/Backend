import express from "express";
import { createUserController } from "../controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.post("/register", createUserController);

export default userRoutes;
