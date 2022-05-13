import express from 'express';
import {
  allKollections,
  setKollection,
  userKollections,
  updateKollection,
  deleteKollection,
} from '../controllers/kollections';
const router = express.Router();

router
  .route('/')
  .get(allKollections)
  .post(setKollection)
  .delete(deleteKollection);
router.route('/user/:userId').get(userKollections);
router.route('/:id').patch(updateKollection);
export default router;
