import mongoose from 'mongoose';
import 'mongoose-type-email';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

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
    lastLoggedIn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const updatedUser = await this.findOneAndUpdate(
        { email },
        { lastLoggedIn: Date.now() },
        { new: true }
      );
      return updatedUser;
    } else throw 'Incorrect password';
  } else throw 'Incorrect email';
};

const User = mongoose.model('User', userSchema);
export default User;
