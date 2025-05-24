const express = require('express');
const router = express.Router();
const { getUser, updateUser ,createUser} = require('../controllers/userController');
const User = require('../models/User');
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.post('/', createUser);
module.exports = router;


