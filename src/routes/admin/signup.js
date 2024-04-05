import bcrypt from 'bcrypt';
import express from 'express';
import db from '../../../db.js';

const adminSignUpRouter = express();

adminSignUpRouter.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ msg: 'missing parameters' });
  }
  db.query(
    'select * from organizer where email = ?',
    [email],
    async (err, results) => {
      if (err) {
        res.status(500).json({ msg: 'Error creating admin account' });
      } else if (results.length > 0 && results[0]?.email === email) {
        res.json({ msg: 'User already exits' });
      } else {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        db.query(
          'INSERT INTO organizer(name, email, password) values(?, ?, ?) ',
          [name, email, hashedPassword],
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res.json({ msg: 'Organizer/Admin account created' });
            }
          }
        );
      }
    }
  );
});

export default adminSignUpRouter;
