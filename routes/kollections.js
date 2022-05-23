import express from 'express';
import {
  allKollections,
  createKollection,
  userKollections,
  updateKollection,
  deleteKollection,
  findKollection,
} from '../controllers/kollections.js';
const router = express.Router();

router.route('/').get(allKollections).delete(deleteKollection);
router.route('/create/:userId').post(createKollection);
router.route('/user/:userId').get(userKollections);
router.route('/:id').patch(updateKollection);
router.route('/:kollectionId').get(findKollection);
export default router;
