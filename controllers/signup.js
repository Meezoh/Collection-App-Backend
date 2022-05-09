import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/*
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password))
      res.status(400).json({ msg: 'All input is required' });

    const oldUser = await User.findOne({ email });
    if (oldUser)
      res.status(409).json({ msg: 'User already exist. Please login' });

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // create token
    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: '30d',
    });

    user.token = token;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!(name && email && password))
      res.status(400).json({ msg: 'All input is required' });

    const oldUser = await User.findOne({ email });
    if (oldUser)
      res.status(409).json({ msg: 'User already exist. Please login' });

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // create token
    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: '30d',
    });

    user.token = token;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export default signup;
