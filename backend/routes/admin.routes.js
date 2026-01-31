import { Router } from "express";
import adminAuth from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  addPhoto,
  addProduct,
  changePassword,
  customers,
  dashboardData,
  deleteProduct,
  getMonthlyRevenue,
  getOrders,
  getProducts,
  orderDetail,
  toggleProduct,
  updateOrderStatus,
} from "../controllers/admin.controller.js";

const router = Router();

router.post(
  "/add-product",
  upload.fields([{ name: "images", maxCount: 10 }]),
  addProduct
);
router.patch("/change-password", adminAuth, changePassword);
router.post("/add-photo", adminAuth, upload.single("image"), addPhoto);
router.get("/products", getProducts);
router.get("/orders", getOrders);
router.get("/monthly-rev", getMonthlyRevenue);
router.get("/recent-orders", dashboardData);
router.patch("/toggle/:productId", toggleProduct);
router.delete("/delete/:productId", deleteProduct);
router.get("/order/:orderId", orderDetail);
router.patch("/order/status/:orderId", updateOrderStatus);
router.get("/customers", customers);




export default router;
