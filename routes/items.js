import express from 'express';
import {
  createItem,
  kollectionItems,
  updateItem,
  deleteItem,
  like,
  comment,
  // createTag,
} from '../controllers/items.js';
const router = express.Router();

router.route('/').delete(deleteItem);
router.route('/create/:kollectionId').post(createItem);
router.route('/:kollectionId').get(kollectionItems);
router.route('/:id').patch(updateItem);
router.route('/:id/likes').put(like);
router.route('/:id/comments').put(comment);

export default router;
