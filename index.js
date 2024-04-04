import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import signInRoute from './src/routes/signin.js';
import Router from './src/routes/signup.js';

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(
  'mongodb+srv://anishparkhi03:anish@cluster0.hayl2hj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/project'
);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/', Router);
app.use('/', signInRoute);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
