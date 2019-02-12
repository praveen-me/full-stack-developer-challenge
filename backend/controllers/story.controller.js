const Story = require('./../models/Story');
const User = require('./../models/User');

module.exports = {
  addStory: (req, res) => {
    const story = req.body;
    // const imageURL = req.body.cover;

    // fs.readFile(imageURL, (err, data) => {
    //   // let extensionName = path.extname(`${process.cwd()}/pics/demopic.png`);

    //   let base64Image = new Buffer(data, 'binary').toString('base64');
    //   // let imgSrcString = `dat:image/${extensionName.split('.').pop()};base64,${base64Image}`;
    //   res.send(base64Image);
    // });

    // res.wri
    // if(req.user) {
    //   User.findOne({_id: req.user._id}, {password: 0}, (err, data) => {
    //     if(err) throw err;
    //     return res.json({
    //       data: data
    //     })
    //   })
    // }

    const newStory = Story({
      ...story,
      user: req.user._id,
      userName: req.user.fullName,
    });

    newStory.save((err, data) => {
      if (err) throw err;
      res.json({
        data,
      });
    });
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
