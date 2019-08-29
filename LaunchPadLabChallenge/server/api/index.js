const router = require('express').Router();

router.use('/votes', require('./votes'));

// Handle 404s
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
