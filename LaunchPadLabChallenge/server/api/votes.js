const router = require('express').Router();
const { Vote, User } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const votes = await Vote.findById(1);
    res.json(votes);
  } catch (err) {
    next(err);
  }
});

router.put('/:framework', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        sessionID: req.sessionID
      }
    });

    // User can vote only once with the same sessionID.
    if (user.length) {
      console.log('User voted once already.');
    } else {
      const votes = await Vote.findById(1);
      const framework = req.params.framework;
      if (framework === 'react') {
        votes.update({react: votes.react + 1});
      } else if (framework === 'angular') {
        votes.update({angular: votes.angular + 1});
      } else if (framework === 'ember') {
        votes.update({ember: votes.ember + 1});
      } else if (framework === 'vue') {
        votes.update({vue: votes.vue + 1});
      }
      User.create({sessionID: req.sessionID});
      res.json(votes);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
