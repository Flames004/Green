import { Router } from 'express';
import upload from '../middleware/multer.middleware.js'
import { addPlant } from '../controllers/products/plant.controller.js';
import adminAuth from '../middleware/admin.middleware.js';


const router = Router();

router.post("/add-plant",adminAuth, upload.fields([
    { name: "images", maxCount: 10}
]), addPlant);

export default router;