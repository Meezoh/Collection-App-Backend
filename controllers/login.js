import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    console.log(user);

    // create token
    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: '30d',
    });

    user.token = token;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export default login;
