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
        res.json({
          user
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
  getStoriesForSingleUser: (req, res) => {
    const { username } = req.params;
    User.findOne({ username }, (err, userData) => {
      if (err) throw err;
      Story.find({ user: userData._id }, (err, data) => {
        if (!data.length) {
          res.status(302).json({
            msg: "You don't have any article."
          });
        } else {
          res.json({
            userStories: data,
          });
        }
      });
    });
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
