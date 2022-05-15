import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  like: {
    type: String,
    required: [true, 'must provide a like'],
  },
});

const Like = mongoose.model('Like', likeSchema);
export default Like;
