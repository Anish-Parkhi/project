import express from 'express';
import userMiddleWare from '../../middlewares/usermiddleware.js';
import db from '../../../db.js';

const cancelTicketRotuer = express();

cancelTicketRotuer.delete('/cancelticket', userMiddleWare,(req, res) => {
  const email = req.email
  try {
    const { ticketId } = req.body;
    db.query('select user_id from user where email = ? ',[email],(err, results) => {
      if(err){
        return res.status(500).json({msg:"Error getting user"})
      }else{
        const user_id = results[0].user_id;
        db.query(
          `delete from ticket where user_id = ? and ticket_id = ?`,
          [user_id, ticketId],
          (err, result) => {
            if (err) {
              return res.status(500).json({ msg: 'Not able to cancel the ticket' });
            } else {
              db.query(
                `delete from registrations where user_id = ? and ticket_id = ?`,
                [user_id, ticketId],
                (err, result) => {
                  if (err) {
                    return res.status(500).json({ msg: 'Not able to unregister' });
                  } else {
                    console.log(result)
                    return res.json({ msg: 'Ticket cancelled successfully' });

                  }
                }
              );
            }
          }
        );
      }
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

export default cancelTicketRotuer;
