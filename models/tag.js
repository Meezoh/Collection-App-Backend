import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const tagSchema = new Schema(
  {
    tag: {
      type: String,
    },
    inItem: {
      type: ObjectId,
      ref: 'Item',
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
