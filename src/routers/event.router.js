// Init router and import controller-wrapper and eventController
import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import eventController from "../controllers/eventController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

// Create a new router
const router = Router();

// Use all routes
router.get("/events", cw(eventController.getAllEvents));
router.get("/events/:id", cw(eventController.getOneEvent));
router.post("/events", isLoggedIn, cw(eventController.createAnEvent));

// Export the router
export default router;