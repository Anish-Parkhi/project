import express from 'express';
import db from '../../../db.js';
import bcrypt from 'bcrypt'

const userSignUpRouter = express();

userSignUpRouter.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ msg: 'Rquired info not found in body' });
  }
  db.query('SELECT * FROM user where email = ?', [email], async(err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Unable to fetch existign user' });
    } else {
      if (results.length > 0 && results[0]?.email === email) {
        return res.json({ msg: 'User already exists' });
      } else {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        db.query(
          'INSERT INTO user(email, name, password)values(?,?,?)',
          [email, name, hashedPassword],
          (err, results) => {
            if (err) {
              return res.status(500).json({ msg: 'Error creating user' });
            } else {
              res.json({ msg: 'User created successfully '});
            }
          }
        );
      }
    }
  });
});

export default userSignUpRouter;
