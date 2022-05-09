import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide a name'],
    },
    tag: {
      type: String,
      required: [true, 'must provide a tag'],
    },
    Optional1a: {
      type: Number,
    },
    Optional1b: {
      type: Number,
    },
    Optional1c: {
      type: Number,
    },
    Optional2a: {
      type: String,
    },
    Optional2b: {
      type: String,
    },
    Optional2c: {
      type: String,
    },
    Optional3a: {
      type: String,
    },
    Optional3b: {
      type: String,
    },
    Optional3c: {
      type: String,
    },
    Optional4a: {
      type: Boolean,
    },
    Optional4b: {
      type: Boolean,
    },
    Optional4c: {
      type: Boolean,
    },
    Optional5a: {
      type: Date,
    },
    Optional5b: {
      type: Date,
    },
    Optional5c: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('Collection', itemSchema);
export default Item;
