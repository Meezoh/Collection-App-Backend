import express from 'express';
import {
  createItem,
  kollectionItems,
  updateItem,
  deleteItem,
  like,
  comment,
} from '../controllers/items';
const router = express.Router();

router.route('/').delete(deleteItem);
router.route('/create/:kollectionId').post(createItem);
router.route('/kollection/:kollectionId').get(kollectionItems);
router.route('/:id').patch(updateItem);
router.route('/:id/likes').put(like);
router.route('/:id/comments').put(comment);

export default router;
