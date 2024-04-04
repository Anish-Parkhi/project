import mongoose from 'mongoose';

const userModel = mongoose.model('user', {
  username: String,
  password: String,
});

export default userModel;
