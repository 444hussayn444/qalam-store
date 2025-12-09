import express from "express"
import { get_otp, register_controller } from "../controllers/store_controllers.js";
import { get_jwt } from "../controllers/utils/jwt_handler.js";
export const a_router = express.Router();


a_router.post("/send-otp", get_otp);
a_router.post("/register", register_controller);