import express from 'express';
import bcrypt from 'bcrypt'

const Router = express.Router();

Router.post('/user/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ msg: 'Username or password not provided' });
  }

});
