import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
            if (err) return res.status(400).json({msg: 'Invalid Token'});
            next();
        })
    } else res.status(403).json({msg: 'You are not authorized. Please login!'});
}

export default verifyToken;
