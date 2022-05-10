import express from 'express';
import { allItems, setItem, kollectionItems } from '../controllers/items';
const router = express.Router();

router.route('/').get(allItems).post(setItem);
router.route('/kollection/:kollectionId').get(kollectionItems);
export default router;
