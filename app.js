import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import morgan from 'morgan';
import login from './controllers/login.js';
import signup from './controllers/signup.js';
import users from './routes/users.js';
import kollections from './routes/kollections.js';
import items from './routes/items.js';
import allItems from './routes/allItems.js';
import notFound from './middlewares/not-found.js';
import verifyAdmin from './middlewares/verifyAdmin.js';
import verifyToken from './middlewares/verifyToken.js';
import cors from 'cors';

console.log('4ck offffff and piss yourself 0000000');
// express app
const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/users', verifyToken, verifyAdmin, users);
app.use('/api/collections', kollections);
app.use('/api/items', verifyToken, items);
app.use('/api/allitems', allItems);
app.use(notFound);

// connect to mongodb and listen for requests
const port = process.env.PORT || 3010;
const start = async () => {
  try {
    await connectDB(process.env.DBURI);
    app.listen(port, console.log(`listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
