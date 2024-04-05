import bcrypt from 'bcrypt';
import express from 'express';
import db from '../../../db.js';

const adminSignInRouter = express();

adminSignInRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ msg: 'Missing parameters' });
  }
  db.query(
    'SELECT password from organizer where email = ?',
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "User Doesn't exist" });
      } else if (result.length < 1) {
        return res.json({ msg: "User doesn't exists" });
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        result[0].password
      );
      console.log(isPasswordCorrect);
      if (isPasswordCorrect) {
        res.status(200).json({ msg: 'User verified successfully' });
      } else {
        return res.json({ msg: 'Incorrect password' });
      }
    }
  );
});

export default adminSignInRouter;
