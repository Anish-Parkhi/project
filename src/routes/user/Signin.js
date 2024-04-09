import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../../db.js';
const jwtkey = '1234';

const userSignInRouter = express();

userSignInRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ msg: 'Required attributes not found' });
  }
  db.query(
    'SELECT * FROM user where email = ?',
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "User doesn't exists" });
      } else {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          results[0].password
        );
        if (isPasswordCorrect) {
          const token = jwt.sign({ email: email, role: 'user' }, jwtkey);
          res.json({ msg: 'user signed in successfully', token });
        } else {
          return res.json({ msg: 'Incorrect password' });
        }
      }
    }
  );
});

export default userSignInRouter;
