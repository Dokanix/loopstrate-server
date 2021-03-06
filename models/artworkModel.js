import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Art must have a title'],
  },
  path: {
    type: String,
    required: [true, 'Art must have an image'],
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  addedAt: {
    type: Date,
    index: true,
    default: Date.now(),
  },
  contest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
  },
});

artworkSchema.pre(/^find/, function (next) {
  this.populate('author');

  next();
});

artworkSchema.plugin(uniqueValidator);

const Artwork = mongoose.model('Artwork', artworkSchema);

export default Artwork;
