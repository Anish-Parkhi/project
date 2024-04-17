import jwt from 'jsonwebtoken';
const jwtKey = '1234';

const userMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ msg: 'Token not found' });
  }
  try {
    const isVerified = jwt.verify(token, jwtKey);
    const info = jwt.decode(token, jwtKey)
    console.log(isVerified);
    if (isVerified && isVerified.role === 'user') {
      req.email = info.email
      next();
    } else {
      res.json({ msg: 'Access denied!' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export default userMiddleWare;
