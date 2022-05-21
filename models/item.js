import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const itemSchema = new Schema(
  {
    name: {
      type: String,
    },
    tag: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        text: String,
        createdBy: {
          type: ObjectId,
          ref: 'User',
        },
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
    inKollection: {
      type: ObjectId,
      ref: 'Kollection',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    optional1a: {
      type: Number,
    },
    optional1b: {
      type: Number,
    },
    optional1c: {
      type: Number,
    },
    optional2a: {
      type: String,
    },
    optional2b: {
      type: String,
    },
    optional2c: {
      type: String,
    },
    optional3a: {
      type: String,
    },
    optional3b: {
      type: String,
    },
    optional3c: {
      type: String,
    },
    optional4a: {
      type: Boolean,
    },
    optional4b: {
      type: Boolean,
    },
    optional4c: {
      type: Boolean,
    },
    optional5a: {
      type: Date,
    },
    optional5b: {
      type: Date,
    },
    optional5c: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);
export default Item;
