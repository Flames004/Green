import {Router} from 'express';
import { addContactInfo } from '../controllers/contact.controller.js';

const router = Router();

router.post('/add', addContactInfo);
router.get('/all', addContactInfo);


export default router;