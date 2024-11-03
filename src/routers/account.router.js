import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import meController from "../controllers/meController.js";

const router = Router();

router.get("/me", isLoggedIn, cw(meController.getSelfProfile));
router.patch("/me", isLoggedIn, cw(meController.updateSelfProfile));
router.delete("/me", isLoggedIn, cw(meController.deleteSelfProfile));

export default router;