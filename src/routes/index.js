import { Router } from "express";
import authRoute from "./auth.router.js";
import tagRoute from "./tag.router.js";
import usersRoute from "./users.router.js";
import eventRoute from "./event.router.js";

export const router = Router();

router.use(authRoute);
router.use(tagRoute);
router.use(usersRoute);
router.use(eventRoute);