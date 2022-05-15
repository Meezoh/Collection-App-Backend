import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import morgan from 'morgan';
import login from './controllers/login';
import signup from './controllers/signup';
import users from './routes/usersRoutes';
import kollections from './routes/kollectionsRoute';
import items from './routes/items';
import allItems from './routes/allItems';
import notFound from './middlewares/not-found';
import verifyAdmin from './middlewares/verifyAdmin';
import verifyToken from './middlewares/verifyToken';
import cors from 'cors';

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
