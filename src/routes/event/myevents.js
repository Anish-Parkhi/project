import express from 'express';
import db from '../../../db.js';
import userMiddleWare from '../../middlewares/usermiddleware.js';
const myEventsRouter = express();

myEventsRouter.get('/myevents', userMiddleWare, (req, res) => {
  try {
    const email = req.email;
    db.query(
      'select user_id from user where email = ?',
      [email],
      (err, results) => {
        if (err) {
          return res.status(500).json({ msg: 'Failed to get events' });
        } else {
          const userId = results[0].user_id;
          console.log(userId);
          db.query(
            `select * from registrations r
            join 
            user u
            on u.user_id = r.user_id
            join
            event e
            on e.event_id = r.event_id
            join 
            venue v
            on e.venue_id = v.venue_id
            join
            host h
            on e.host_id = h.host_id
            join ticket t
            on t.ticket_id = r.ticket_id
            where u.user_id = ?;
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
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

export default myEventsRouter;
