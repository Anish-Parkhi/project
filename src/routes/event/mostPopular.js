import express from 'express';
import db from '../../../db.js';
import userMiddleWare from '../../middlewares/usermiddleware.js';

const mostPopularRouter = express();

mostPopularRouter.get('/mostpopular',userMiddleWare, (req, res) => {
  db.query(
    `SELECT 
	event.*,
    venue.*,
    host.*,
    organizer.*,
    COUNT(registrations.registration_id) AS registration_count
FROM 
    event
JOIN 
    registrations ON event.event_id = registrations.event_id
JOIN 
	venue ON venue.venue_id = event.event_id
JOIN 
	host on host.host_id = event.host_id
JOIN
	organizer on organizer.organizer_id = event.organizer_id
GROUP BY 
    event.event_id,
    event.event_name,
    event.event_date
ORDER BY 
    registration_count DESC
LIMIT 3;
`,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: 'Error fetching most popular events' });
      } else {
        res.json(results);
      }
    }
  );
});

export default mostPopularRouter;
