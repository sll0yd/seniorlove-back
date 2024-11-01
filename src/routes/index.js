// Import and use all routes here
import { Router } from "express";
import authRoute from "./auth.router.js";
import tagRoute from "./tag.router.js";
import usersRoute from "./users.router.js";
import eventRoute from "./event.router.js";

// Create a new router
export const router = Router();

// Use all routes
router.use(authRoute);
router.use(tagRoute);
router.use(usersRoute);
router.use(eventRoute);