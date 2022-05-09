import express from 'express';
import allUsers from '../controllers/users';
const router = express.Router();

router.route('/').get(allUsers);
export default router;
