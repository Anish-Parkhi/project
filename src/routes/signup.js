import express from 'express';
import bcrypt from 'bcrypt'

const Router = express.Router();

Router.post('/user/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ msg: 'Username or password not provided' });
  }
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
    console.log(hash);
    res.status(201).json({ msg: 'User created' });
  });
});
