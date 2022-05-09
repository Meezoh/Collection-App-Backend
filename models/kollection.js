import mongoose from 'mongoose';
import Item from './item';
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
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: Item,
      },
    ],
  },
  { timestamps: true }
);

const Kollection = mongoose.model('Kollection', kollectionSchema);
export default Kollection;
//  =  mongoose.model.Collection || mongoose.model('Collection', collectionSchema);
