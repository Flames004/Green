import {Router} from 'express';
import { addReview, getReviews, removeReview } from '../controllers/review.controller.js';
import {verifyJwt} from '../middleware/auth.middleware.js'

const router = Router();

router.post("/add-review/:productId", verifyJwt, addReview);
router.get("/get-all/:productId", getReviews);
router.delete("/remove-review/:reviewId", verifyJwt, removeReview);

export default router;