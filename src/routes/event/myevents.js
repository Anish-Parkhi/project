import express from 'express';
import db from '../../../db.js';
const myEventsRouter = express();
import userMiddleWare from '../../middlewares/usermiddleware.js';

myEventsRouter.get('/myevents', userMiddleWare ,(req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.json({ msg: 'User Id not found in query' });
    }
    db.query(
      `select * from registrations r
    join 
    user u
    on u.user_id = r.user_id
    join
    event e
    on e.event_id = r.event_id
    where u.user_id = ?
    `,
      [userId],
      (error, result) => {
        if (error) {
          return res.status(500).json({ msg: 'Failed to get events' });
        } else {
          res.json(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

export default myEventsRouter;
