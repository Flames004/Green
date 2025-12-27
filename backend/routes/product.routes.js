import { Router } from 'express';
import { getAllPlants, getAllPots, getSinglePlant } from '../controllers/products/product.controller.js';



const router = Router();

// plant
router.get("/all/plants", getAllPlants);
router.get("/single-plant/:id", getSinglePlant);


// pots

router.get("/all/pots", getAllPots);



export default router;