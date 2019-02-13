const express = require('express');
const story = require('./../controllers/story.controller');
const user = require('./../controllers/user.controller');
const auth = require('./../modules/auth');

const router = express.Router();

router.post('/signup', user.signUp);

router.post('/login', user.logIn);

router.post('/users/:id/stories', auth.isLoggedIn, story.addStory);

router.get('/users/:id/stories', auth.isLoggedIn, story.getUserStories)

router.delete('/users/:id/stories/:storyId', auth.isLoggedIn, story.deleteStory)

router.get('/stories', auth.isLoggedIn, story.getAllStories);

router.put('/stories/:storyId', story.upvoteStory);

router.put('/users/:id/stories/:storyId', auth.isLoggedIn, story.updateStory);

// waking up api's
router.get('/wakeup', (req, res) => {
  res.send('ZZZZ.....')
});

module.exports = router;
