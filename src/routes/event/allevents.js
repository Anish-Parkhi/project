import express from 'express';
import db from '../../../db.js';
const allEventsRouter = express();

allEventsRouter.get('/', (req, res) => {
  db.query(
    `select * from event
  join 
  host
  on event.host_id = host.host_id
  join 
  venue
  on event.venue_id = venue.venue_id
  join organizer
  on event.organizer_id = organizer.organizer_id;
  `,
    (err, results) => {
      if (err) {
        res.status(500).json({ msg: 'Error retrving events' });
      } else {
        res.json(results);
      }
    }
  );
});

export default allEventsRouter;
