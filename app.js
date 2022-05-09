import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import morgan from 'morgan';
import login from './controllers/login';
import signup from './controllers/signup';
import users from './routes/usersRoutes';
import kollections from './routes/kollectionsRoute';
import items from './routes/itemsRoute';
import notFound from './middlewares/not-found';
import verifyAdmin from './middlewares/verifyAdmin';
import cors from 'cors';
import { urlencoded } from 'express';

// express app
const app = express();
dotenv.config();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/users', users);
app.use('/api/kollections', kollections);
app.use('/api/items', items);
app.use(notFound);

// connect to mongodb and listen for requests
const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.DBURI);
    app.listen(port, console.log(`listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();

// app.get('/kollections', async (req, res) => {
//   const kollection = new Kollection({
//     name: 'BMW',
//     description: 'car',
//     topic: 'sporty',
//   });
//   const response = await kollection.save();
//   res.send(response);
// });
