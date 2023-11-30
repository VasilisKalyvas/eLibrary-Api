const verifyAuth = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    } else {
      // If the token is present, you might want to proceed with the next middleware or route handler.
      // You can call the next function to move to the next middleware or route handler in the chain.
      next();
    }
  };
  
  module.exports = { verifyAuth };