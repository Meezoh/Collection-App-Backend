import express from 'express';
import { createTag, autoCompleteTag } from '../controllers/tags.js';
const router = express.Router();

// router.route('/search/:itemId').get(searchTag);
router.route('/create/:itemId').post(createTag);
router.route('/autocomplete/:term').get(autoCompleteTag);

export default router;
