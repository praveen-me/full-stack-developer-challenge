const Story = require('./../models/Story');
const User = require('./../models/User');
// Story.find({userId : story.userId}, (err, stories) => {
// });

module.exports = {
  addStory: (req, res) => {
    const storyData = req.body;
    const newStory = Story({
      ...storyData,
    });

    newStory.save((err, story) => {
      if (err) throw err;
      console.log(story)
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
    console.log(req.query)
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
    }
  },
  setClaps: (req, res) => {
    const { storyId } = req.params;
    const clapsData = req.body;
    Story.findById(storyId, (err, data) => {
      const clappedUserIndex = '';
      // var isUserClapped = false;

      data.claps += clapsData.claps;
      // isUserClapped = data.userClapped.some((user,i) => {
      //   if(user.userId === clapsData.userId) {
      //     clappedUserIndex = i;
      //   }
      // })

      const isUserClapped = data.userClapped.filter((user,i) => user.userId === `ObjectId("${clapsData.userId}")`)


      console.log(req.body)
      console.log(isUserClapped);

      // if(isUserClapped && clappedUserIndex) {
      //   data.userClapped[clappedUserIndex].claps += clapsData.claps
      // } else {
      //   data.userClapped.push({
      //     userId: clapsData.userId,
      //     claps: clapsData.claps
      //   })
      // }
      // console.log(data)
      // data.save();

      res.json({
        data
      })

    })
  },
};
