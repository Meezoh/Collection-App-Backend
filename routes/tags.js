import express from 'express';
import { createTag, searchTag, autoCompleteTag } from '../controllers/tags.js';
const router = express.Router();

router.route('/create/:itemId').post(createTag);
router.route('/search/:itemId').get(searchTag);
router.route('/autocomplete/:term').get(autoCompleteTag);

export default router;
