import express from 'express';
import {
  allUsers,
  updateUser,
  deleteUsers,
  updateManyUsers,
} from '../controllers/users.js';
const router = express.Router();

router.route('/').get(allUsers).delete(deleteUsers).patch(updateManyUsers);

router.route('/:id').patch(updateUser);

export default router;
