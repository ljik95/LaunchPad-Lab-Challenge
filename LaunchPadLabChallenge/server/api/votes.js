const router = require('express').Router();
const { Votes } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const allVotes = await Votes.findAll({});
    res.json(allVotes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
