const express = require('express');
const router = express.Router();
const auth = require('./verifiedToken');
const {
  getAllUsers,
  getUser,
  updateUser,
  blockUser,
  deleteUser,
} = require('../controllers/user');

router.route('/').get(auth, getAllUsers);

router
  .route('/:_id')
  .get(auth, getUser)
  .put(auth, updateUser)
  .patch(auth, blockUser)
  .delete(auth, deleteUser);

module.exports = router;
