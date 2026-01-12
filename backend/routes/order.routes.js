import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getAllOrders, orderDetails, placeOrder } from "../controllers/order.controller.js";


const router = Router();

router.post("/place-order", verifyJwt, placeOrder);
router.get("/all", verifyJwt, getAllOrders);
router.get("/:orderId", verifyJwt, orderDetails);

export default router;