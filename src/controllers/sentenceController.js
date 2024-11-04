import { Sentence } from "../models/sentence.model.js";

const sentenceController = {
	async getAllSentences (req, res) {
		const sentences = await Sentence.findAll();
		res.json(sentences);
	},
	async getOneSentence (req, res) {
		const id = req.params.id;

		if (!id) {
			res.status(400).json({ message: "Id is required" });
		}

		const sentence = await Sentence.findByPk(id);

		if (!sentence) {
			res.status(404).json({ message: "Sentence not found" });
		}
		
		res.json(sentence);
	}
};

export default sentenceController;