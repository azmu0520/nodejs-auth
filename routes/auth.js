const router = require('express').Router();
const User = require('../model/User');
const generateJwtToken = require('../config/config');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
  // Check if the user is exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist?.status) {
    return res.status(400).send({ error: 'Email already in use' });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    user_id: Date.now().toString(36),
  });

  try {
    if (emailExist?.status == false) {
      await User.findByIdAndUpdate(
        emailExist._id,
        { status: true },
        { new: true }
      );
      return res.status(200).send({ user_id: emailExist._id });
    }
    await user.save();
    res.status(201).send({ user_id: user.id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ error: 'Email or Password is wrong' });
  const validPass = req.body.password;
  if (!validPass)
    return res.status(400).send({ error: 'Email or Password is wrong' });
  if (!user.status) {
    return res.status(400).send({ error: 'User is blocked!' });
  }
  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
  res.header('auth-token', token).send({ token: token, id: user.user_id });
});

module.exports = router;
