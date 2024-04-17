import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../../db.js';
import adminMiddleWare from '../../middlewares/adminverification.js';
const createEventRouter = express();

createEventRouter.post('/createevent' ,adminMiddleWare ,(req, res) => {
  // I think I should add data to other tables then at last to the events table
  //info of the organizer should be given in the token issued;
  const { host_name, email, contact_number } = req.body;
  const { venue_name, address, capacity } = req.body;
  const { event_name, event_description, event_date, category } = req.body;
  try {
    const token = req.headers.authorization;
    const tokenInfo = jwt.decode(token);
    const adminEmail = tokenInfo.email;
    db.query(
      'SELECT * FROM organizer where email=?',
      [adminEmail],
      (err, results) => {
        if (err) {
          res.status(500).json({ msg: 'Organizer not found' });
        } else {
          const organizer_id = results[0].organizer_id;
          //insret info of the host
          db.query(
            'INSERT INTO host(host_name, email, contact_number) values(?, ?, ?)',
            [host_name, email, contact_number],
            (err, results) => {
              if (err) {
                return res.status(500).json({ msg: 'Host not found' });
              } else {
                const host_id = results.insertId;
                db.query(
                  'INSERT INTO venue(capacity, venue_name, address) values(?, ?, ?)',
                  [capacity, venue_name, address],
                  (err, results) => {
                    if (err) {
                      return res
                        .status(500)
                        .json({ msg: 'Failed to create venue' });
                    } else {
                      const venue_id = results.insertId;
                      db.query(
                        'INSERT INTO event(host_id, event_name, event_description, event_date, category, venue_id, organizer_id) values (?, ?, ?, STR_TO_DATE(?, "%d/%m/%Y"), ?, ?, ?)',
                        [
                          host_id,
                          event_name,
                          event_description,
                          event_date,
                          category,
                          venue_id,
                          organizer_id,
                        ],
                        (err, results) => {
                          if (err) {
                            console.log(err);
                            db.query(
                              'delete from host where host_id = ?',
                              [host_id],
                              (err, results) => {
                                if (err) {
                                  return res.status(500).json({
                                    msg: 'Error deleting inserted host record',
                                  });
                                } else {
                                  db.query(
                                    'delete from venue where venue_id = ?',
                                    [venue_id],
                                    (err, results) => {
                                      if (err) {
                                        return res.status(500).json({
                                          msg: 'Error deleting venue info from the table',
                                        });
                                      } else {
                                        return res.status(500).json({
                                          msg: 'failed to create event',
                                        });
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          } else {
                            return res.json({
                              msg: 'Event created successfully',
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

export default createEventRouter;
