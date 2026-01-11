import { Router } from "express";
import { addToCart, quantityUpdate } from "../controllers/cart.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router();
router.post("/cart",verifyJwt, addToCart);
router.post("/cart/update-qty", verifyJwt, quantityUpdate);

export default router;