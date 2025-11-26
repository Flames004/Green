import { Router } from 'express';
import { getAllPlants } from '../controllers/products/plant.controller.js';


const router = Router();

router.get("/all", getAllPlants);

export default router;