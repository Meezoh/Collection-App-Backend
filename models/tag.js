import mongoose from 'mongoose';
const { Schema } = mongoose;

const tagSchema = new Schema(
  {
    tag: {
      type: String,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
