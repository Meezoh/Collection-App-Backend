import { Router } from 'express';
import signup from '../controller/signup.js';
const router = Router();

router.route('/').post(signup);
export default router;
