import express from 'express';
import {
  allItems,
  allItemsByTag,
  searchItem,
  autoCompleteTag,
} from '../controllers/items.js';
const router = express.Router();

router.route('/').get(allItems);
router.route('/:tag').get(allItemsByTag);
router.route('/search').get(searchItem);
router.route('/autocomplete').get(autoCompleteTag);

export default router;
