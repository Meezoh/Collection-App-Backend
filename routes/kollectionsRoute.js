import express from 'express';
import {
  allKollections,
  setKollection,
  userKollections,
} from '../controllers/kollections';
const router = express.Router();

router.route('/').get(allKollections).post(setKollection);
router.route('/user/:userId').get(userKollections);
export default router;
