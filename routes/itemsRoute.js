import express from 'express';
import allItems from '../controllers/items';
const router = express.Router();

router.route('/').get(allItems);
export default router;
