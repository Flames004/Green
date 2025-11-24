import { Router } from "express";
import { adminLogin, adminLogout, getAdminProfile } from "../controllers/admin.controller.js";
import adminAuth from "../middleware/admin.middleware.js";



const router = Router();

router.post("/login", adminLogin);
router.get("/profile", adminAuth, getAdminProfile);
router.get("/logout", adminAuth, adminLogout);


export default router;