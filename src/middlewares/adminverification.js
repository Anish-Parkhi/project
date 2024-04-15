import jwt from 'jsonwebtoken';

const jwtKey = '1234';

const adminMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ msg: 'Missing token' });
  }
  const isVerified = jwt.verify(token, jwtKey);
  if (isVerified) {
    if (isVerified.role === 'organizer') {
      next();
    } else {
      return res.json({ msg: 'Access denied!' });
    }
  } else {
    return res.json({ msg: 'Token signature verification failed' });
  }
};

export default adminMiddleWare;
