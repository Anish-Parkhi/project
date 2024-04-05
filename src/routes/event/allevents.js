import express from 'express';
import db from '../../../db.js';

const allEventsRouter = express();

allEventsRouter.get('/', (req, res) => {
  db.query('SELECT * FROM EVENT', (err, results) => {
    if (err) {
      res.status(500).json({ msg: 'Error retrving events' });
    } else {
      res.json(results);
    }
  });
});

export default allEventsRouter;
