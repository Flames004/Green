import { Router } from "express";
import { getUserProfile, logoutUser, regenrateAccessToken, registerUser, verifyOtp } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";



const router = Router();

router.post("/login", registerUser);
router.post("/verify-otp", verifyOtp);
router.get("/profile" , verifyJwt , getUserProfile);
router.get("/logout",verifyJwt, logoutUser);
router.get("/refresh-token", regenrateAccessToken);


export default router;