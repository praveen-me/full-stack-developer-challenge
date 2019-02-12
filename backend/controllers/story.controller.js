const Story = require('./../models/Story');
const User = require('./../models/User');

module.exports = {
  addStory: (req, res) => {
    const storyData = req.body;
    const newStory = Story({
      ...storyData,
    });

    newStory.save((err, story) => {
      if (err) throw err;
      User.findOneAndUpdate({_id: story.userId}, { $push : { stories : story._id } }, { upsert: true }, (err, user) => {
        res.status(201).json({
          story
        })
      })
    })
  },
  getAllStories: (req, res) => {
    Story.find({}, (err, data) => {
      if (err) {
        return res.status(500).json({
          msg: 'Internal Server Problem.',
        });
      }
      if (data.length > 0) {
        return res.json({
          allStories: data,
        });
      }
      res.json({
        allStories: [],
      });
    });
  },
  getUserStories: (req, res) => {
    const { id } = req.params;
    Story.find({ userId: id }, (err, data) => {
      res.status(302).json({
        stories: data,
      });
    });
  },
  deleteStory: (req, res) => {
    const {storyId} = req.params;

    Story.deleteOne({_id : storyId}, (err, done) =>{
      return res.status(200).json({
        msg: 'deleted'
      })
    })
  },
  getAllStories: (req, res) => {
    Story.find({published: true}, (err, stories) => {
      return res.status(302).json({
        stories 
      })
    })
  },
  updateStory: (req, res) => {
    const {storyId} = req.params;
    switch(req.query.mode) {
      case 'edit' : {
        const {description} = req.body;
        Story.findOneAndUpdate({_id : storyId}, {$set: { description }}, (err, story) => {
          res.status(200).json({
            story
          })
        })
      }
      break;
      case 'publish': {
        Story.findOneAndUpdate({_id : storyId}, {$set: { published: true }}, (err, story) => {
          res.status(200).json({
            story
          })
        })
      }
      break;
      case 'clap': {
                                
      } 
    }
  },
};
