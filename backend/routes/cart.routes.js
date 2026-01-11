import { Router } from "express";
import { addToCart, getCart, quantityUpdate, removeItem } from "../controllers/cart.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router();
router.post("/cart",verifyJwt, addToCart);
router.post("/cart/update-qty", verifyJwt, quantityUpdate);
router.delete("/cart/remove-item", verifyJwt, removeItem);
router.get("/cart/all-item", verifyJwt, getCart);

export default router;