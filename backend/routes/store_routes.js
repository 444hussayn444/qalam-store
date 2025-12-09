import express from "express"
import { get_products } from "../controllers/store_controllers.js";

export const s_router = express.Router();


s_router.get("/products", get_products);