import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import { createOrder, verifyPayment } from "../controllers/payment.controller";

const router = Router();

router.post("/create-order", verifyJwt, createOrder);
router.post("/varify-order", verifyJwt, verifyPayment);

export default router;