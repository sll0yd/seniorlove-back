import { Router } from 'express';
// Import the controllerWrapper function
// The controllerWrapper function is used to wrap the controller methods
// It catches any errors that occur in the controller methods and sends a 500 status code with an error message
// It makes it possible not to repeat the try-catch block in each controller method
import { controllerWrapper as cw} from './controller-wrapper.js';
import authController from '../controllers/authController.js';
import tagController from '../controllers/tagController.js';

const router = Router();

router.post('/signup', cw(authController.createUser));
router.post('/login', cw(authController.loginUser));

router.get('/tags', cw(tagController.getTags));

export default router;