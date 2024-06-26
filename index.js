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
import mostPopularRouter from './src/routes/event/mostPopular.js';
import userSignUpRouter from './src/routes/user/Signup.js';
import userSignInRouter from './src/routes/user/Signin.js';
const app = express();
app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});



app.use('/event', allEventsRouter);
app.use('/event', myEventsRouter);
app.use('/ticket', bookTicketRouter);
app.use('/ticket', cancelTicketRotuer);
app.use('/admin', adminSignUpRouter);
app.use('/admin', adminSignInRouter);
app.use('/admin', createEventRouter);
app.use('/event',mostPopularRouter)
app.use('/user',userSignUpRouter);
app.use('/user',userSignInRouter);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
