import bcrypt from 'bcrypt';
import express from 'express';
import userModel from '../models/usersigninmodel';

const Router = express.Router();

Router.post('/user/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(404).json({ msg: 'Username or password not provided' });
    }
    const userExists = userModel.findOne({ username });
    if (userExists) {
      return res.status(404).json({ msg: 'user already exists' });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const generateHash = await bcrypt.hash(password, salt);

    const user = new userModel({
      username: username,
      password: generateHash,
    });

    const userSavedRes = await user.save();
    if (userSavedRes) {
      res.status(200).json({ msg: 'User saved sucessfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});
