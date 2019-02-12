const express = require('express');
const story = require('./../controllers/story.controller');
const user = require('./../controllers/user.controller');
const auth = require('./../modules/auth');

const router = express.Router();

// router.post('/add-story', auth.isLoggedIn, story.addStory);

// router.get('/stories', story.getAllStories);

router.post('/signup', user.signUp);

router.post('/login', user.logIn);

// router.get('/isLoggedIn', user.isLoggedIn);

// router.get('/logOut', user.logout);

// router.get('/:username/stories', auth.isLoggedIn, story.getStoriesForSingleUser);

// router.post('/stories/:storyId/clap', auth.isLoggedIn, story.setClaps);


// waking up api's
router.get('/wakeup', (req, res) => {
  res.send('ZZZZ.....')
});

module.exports = router;
