import { Router } from 'express';
// Import the controllerWrapper function
// The controllerWrapper function is used to wrap the controller methods
// It catches any errors that occur in the controller methods and sends a 500 status code with an error message
// It makes it possible not to repeat the try-catch block in each controller method
import { controllerWrapper as cw} from './controller-wrapper.js';
import authController from '../controllers/authController.js';
import tagController from '../controllers/tagController.js';
import usersController from '../controllers/usersController.js';
import eventController from '../controllers/eventController.js';

const router = Router();

router.post('/signup', cw(authController.createUser));
router.post('/login', cw(authController.loginUser));

router.get('/users', cw(usersController.getAllUsers));
router.get('/users/:id', cw(usersController.getOneUser));

router.get('/events', cw(eventController.getAllEvents));
router.get('/events/:id', cw(eventController.getOneEvent));

router.get('/tags', cw(tagController.getAllTags));

export default router;