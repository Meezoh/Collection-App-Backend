import express from 'express';
import allKollections from '../controllers/kollections';
const router = express.Router();

router.route('/').get(allKollections);
export default router;
