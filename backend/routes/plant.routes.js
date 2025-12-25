import { Router } from 'express';
import { getAllPlants, getSinglePlant } from '../controllers/products/plant.controller.js';


const router = Router();

router.get("/all", getAllPlants);
router.get("/single-plant/:id", getSinglePlant);



export default router;