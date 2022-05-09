import mongoose from 'mongoose';

const connectDB = url => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    console.log('connected to db')
  );
};

export default connectDB;
