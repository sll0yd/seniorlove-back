import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import meController from "../controllers/meController.js";

const router = Router();

router.get("/me", isLoggedIn, cw(meController.getSelfProfile));
router.patch("/me", isLoggedIn, cw(meController.updateSelfProfile));
router.delete("/me", isLoggedIn, cw(meController.deleteSelfProfile));

router.post("/me/tags/:tagId", isLoggedIn, cw(meController.assignTagToSelfProfile));
router.delete("/me/tags/:tagId", isLoggedIn, cw(meController.removeTagFromSelfProfile));

router.post("/me/events", isLoggedIn, cw(meController.createAnEvent));
router.get("/me/events", isLoggedIn, cw(meController.getSelfCreatedEvents));
router.get("/me/events/:eventId", isLoggedIn, cw(meController.getOneOwnedEvent));
router.patch("/me/events/:eventId", isLoggedIn, cw(meController.updateOwnedEvent));
router.delete("/me/events/:eventId", isLoggedIn, cw(meController.deleteOwnedEvent));

export default router;