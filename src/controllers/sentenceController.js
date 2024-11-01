import { Sentence } from "../models/sentence.model.js";

const sentenceController = {
	getAllSentences: async (req, res) => {
		const sentences = await Sentence.findAll();
		res.json(sentences);
	},
};

export default sentenceController;