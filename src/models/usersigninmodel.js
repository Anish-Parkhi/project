import mongoose from 'mongoose';

const userModel = mongoose.model('user', {
  email: String,
  password: String,
});

export default userModel;
