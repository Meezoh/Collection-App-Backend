import express from 'express';
import { allUsers, updateUser, deleteUsers } from '../controllers/users.js';
const router = express.Router();

router.route('/').get(allUsers).delete(deleteUsers);
router.route('/:id').patch(updateUser);

export default router;
