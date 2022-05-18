import express from 'express';
import { latest, autoComplete } from '../controllers/tags.js';
const router = express.Router();

router.route('/latest').get(latest);
router.route('/autocomplete/:term').get(autoComplete);

export default router;
