import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import meController from "../controllers/meController.js";
import messageController from "../controllers/messageController.js";

const router = Router();

router.get("/me", isLoggedIn, cw(meController.getSelfProfile));
router.patch("/me", isLoggedIn, cw(meController.updateSelfProfile));
router.delete("/me", isLoggedIn, cw(meController.deleteSelfProfile));

router.post("/me/profile_picture", isLoggedIn, cw(meController.uploadProfilePicture));

router.post("/me/tags/:tagId", isLoggedIn, cw(meController.assignTagToSelfProfile));
router.delete("/me/tags/:tagId", isLoggedIn, cw(meController.removeTagFromSelfProfile));

router.post("/me/events", isLoggedIn, cw(meController.createAnEvent));
router.get("/me/events", isLoggedIn, cw(meController.getSelfCreatedEvents));
router.get("/me/events/:eventId", isLoggedIn, cw(meController.getOneOwnedEvent));
router.post("/me/events/:eventId/event_picture", isLoggedIn, cw(meController.uploadEventPicture));
router.patch("/me/events/:eventId", isLoggedIn, cw(meController.updateOwnedEvent));
router.delete("/me/events/:eventId", isLoggedIn, cw(meController.deleteOwnedEvent));
router.post("/me/events/:eventId/tags/:tagId", isLoggedIn, cw(meController.addTagToOwnedEvent));
router.delete("/me/events/:eventId/tags/:tagId", isLoggedIn, cw(meController.removeTagFromOwnedEvent));

router.post("/me/events/join/:eventId", isLoggedIn, cw(meController.addMeToEvent));
router.delete("/me/events/join/:eventId", isLoggedIn, cw(meController.removeMeFromEvent));

router.post("/me/messages/:receiverId", isLoggedIn, cw(messageController.createMessage));
router.get("/me/messages/:receiverId", isLoggedIn, cw(messageController.getMessages));

export default router;