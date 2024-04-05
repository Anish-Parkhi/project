import cors from 'cors';
import express from 'express';
import db from './db.js';
import signInRoute from './src/routes/signin.js';
import signUpRouter from './src/routes/signup.js';
import allEventsRouter from './src/routes/event/allevents.js';
import myEventsRouter from './src/routes/event/myevents.js';
import bookTicketRouter from './src/routes/Ticket/bookTicket.js';

const app = express();

app.use(express.json());
app.use(cors());
// mongoose.connect(
//   'mongodb+srv://anishparkhi03:anish@cluster0.hayl2hj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/project'
// );

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});



app.use('/', signUpRouter);
app.use('/', signInRoute);
app.use('/event',allEventsRouter);
app.use('/event',myEventsRouter)
app.use('/ticket', bookTicketRouter)

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
