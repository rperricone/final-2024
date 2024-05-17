const router = require('express').Router();
router.post('/auth/signup', (req, res) => {
  res.send('user');
});
router.post('/auth/login', (req, res) => {
  res.send('user');
});
module.exports = router;
