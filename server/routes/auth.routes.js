import { register, login } from "../controllers/auth.controller.js";
import { app } from "../app.js";
import { Router } from "express";

const router = Router()

router.route("/register").post(register);
router.route("/login").post(login);


export default router

