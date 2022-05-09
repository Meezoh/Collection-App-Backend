import { Router } from 'express';
import login from '../controller/login.js';
const router = Router();

router.route('/').post(login);
export default router;
