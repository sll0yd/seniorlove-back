import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import meController from "../controllers/meController.js";

const router = Router();

router.get("/me", isLoggedIn, cw(meController.getSelfProfile));

export default router;