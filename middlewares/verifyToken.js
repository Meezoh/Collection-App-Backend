import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';
dotenv.config();

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
      if (err) return res.status(400).json({ msg: 'Invalid Token' });

      const { userId } = payload;
      User.findById(userId).then(userdata => {
        req.user = userdata;
        return next();
      });
    });
  } else
    return res
      .status(403)
      .json({ msg: 'You are not authorized. Please login!' });
};

export default verifyToken;
