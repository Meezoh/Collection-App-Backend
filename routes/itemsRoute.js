import express from 'express';
import {
  allItems,
  setItem,
  kollectionItems,
  updateItem,
  deleteItem,
  searchItem,
} from '../controllers/items';
const router = express.Router();

router.route('/').get(allItems).post(setItem).delete(deleteItem);
router.route('/kollection/:kollectionId').get(kollectionItems);
router.route('/:id').patch(updateItem);

// TODO: the searchItem route
router.route('/search').post(searchItem);

export default router;
