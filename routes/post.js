const router = require('express').Router();
const verify = require('./verifiedToken');
router.get('/', (req, res) => {
  res.json({
    posts: {
      title: 'Title',
      desc: 'sfdsdffs',
    },
  });
});

module.exports = router;
