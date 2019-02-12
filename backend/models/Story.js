const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  title: String,
  description: String,
  cover: { type: String, default: '' },
  date: { type: Date, default: new Date() },
  claps: { type: Number, default: 0 },
  userClapped: [{
    userId: ObjectId,
    claps: { type: Number, default: 0, max: 50 },
  }],
  userName: String,
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
