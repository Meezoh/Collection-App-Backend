import mongoose from 'mongoose';
const { Schema } = mongoose;

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
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Kollection = mongoose.model('Kollection', kollectionSchema);
export default Kollection;
