import mongoose from 'mongoose';
import 'mongoose-type-email';
import Kollection from './kollection';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide a name'],
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, 'must provide a valid email address'],
    },
    role: {
      type: String,
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'must provide a password'],
      minlength: [1, 'password must be at least one character'],
    },
    selected: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
    },
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: Kollection,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
