import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/usersigninmodel.js';
const jwtKey = '1234';

const signInRoute = express.Router();

signInRoute.post('/user/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(200).json({ msg: 'username and password not found' });
    }
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res.json({ msg: 'user not found' });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (hashedPassword) {
      const token = jwt.sign({username: username}, jwtKey);
      return res
        .status(200)
        .json({ msg: 'user logged in successfully', token: token });
    } else {
      return res.status(200).json({ msg: 'Password incorrect' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

export default signInRoute;
