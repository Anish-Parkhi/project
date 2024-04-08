import cors from 'cors';
import express from 'express';
import db from './db.js';
import bookTicketRouter from './src/routes/Ticket/bookTicket.js';
import cancelTicketRotuer from './src/routes/Ticket/cancelTicket.js';
import createEventRouter from './src/routes/admin/createEvent.js';
import adminSignInRouter from './src/routes/admin/signin.js';
import adminSignUpRouter from './src/routes/admin/signup.js';
import allEventsRouter from './src/routes/event/allevents.js';
import myEventsRouter from './src/routes/event/myevents.js';
import signInRoute from './src/routes/signin.js';
import signUpRouter from './src/routes/signup.js';
import mostPopularRouter from './src/routes/event/mostPopular.js';
const app = express();
app.use(cors());
app.use(express.json());
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
app.use('/event', allEventsRouter);
app.use('/event', myEventsRouter);
app.use('/ticket', bookTicketRouter);
app.use('/ticket', cancelTicketRotuer);
app.use('/admin', adminSignUpRouter);
app.use('/admin', adminSignInRouter);
app.use('/admin', createEventRouter);
app.use('/event',mostPopularRouter)

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
