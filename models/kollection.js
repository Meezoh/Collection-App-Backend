import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const kollectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide a name'],
    },
    description: {
      type: String,
      required: [true, 'must provide a description'],
    },
    topic: {
      type: String,
      required: [true, 'must provide a description'],
    },
    image: {
      data: Buffer,
      type: String,
    },
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Kollection = mongoose.model('Kollection', kollectionSchema);
export default Kollection;
