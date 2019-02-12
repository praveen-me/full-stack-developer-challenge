const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User' },
  description: {type :String},
  published: {type: Boolean},
  date: { type: Date, default: new Date() },
  userClapped: [{
    userId: {type : ObjectId}
  }],
  username: {type : String},
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
