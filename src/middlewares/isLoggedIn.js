import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';

// Middleware to check if the user is logged in
// If the user is not logged in, return a 401 status code with a message
// If the user is logged in, continue to the next middleware (here, the controller wrapper before continuing to the controller)

// Initialize the isLoggedIn middleware
const isLoggedIn = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  // Remove the Bearer prefix from the token (if it exists)
  const tokenWhithoutBearer = token ? token.slice(7) : null;

  // If the token is not provided, return a 401 status code with a message
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  // Verify the token
  try {
    // Decode the token using the verify method, giving the token and the JWT_SECRET from the .env file
    const decoded = jwt.verify(tokenWhithoutBearer, process.env.JWT_SECRET);

    // Find the user by the id from the decoded token
    const user = await Users.findByPk(decoded.id);

    // If the user is not found, return a 401 status code with a message
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // If the user is found, assign the user to the req object and continue to the next middleware
    req.user = user;

    // Continue to the next middleware
    next();

  } catch (error) {
    // If the token is invalid, return a 401 status code with a message
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default isLoggedIn;