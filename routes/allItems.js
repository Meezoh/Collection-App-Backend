import express from 'express';
import { allItems, allItemsByTag, searchItem } from '../controllers/items.js';
const router = express.Router();

router.route('/').get(allItems);
router.route('/:tag').get(allItemsByTag);
router.route('/search/:term').get(searchItem);

export default router;
