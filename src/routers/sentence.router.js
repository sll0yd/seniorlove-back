import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import sentenceController from "../controllers/sentenceController.js";

const router = Router();

router.get("/sentences", cw(sentenceController.getAllSentences));
router.get("/sentences/:id", cw(sentenceController.getOneSentence));

export default router;