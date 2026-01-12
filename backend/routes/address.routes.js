import {Router} from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { addAddress, deleteAddress, getAddress, updateAddress } from "../controllers/address.controller.js";

const router = Router();

router.post("/add-addr", verifyJwt, addAddress);
router.get("/get-addr", verifyJwt, getAddress);
router.delete("/remove-addr/:id", verifyJwt, deleteAddress);
router.patch("/update-addr/:id", verifyJwt, updateAddress);

export default router;