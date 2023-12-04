const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden Action' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized - Token has expired' });
    }
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = { verifyAdmin };

