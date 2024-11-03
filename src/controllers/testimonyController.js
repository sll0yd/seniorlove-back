import { Testimony, Users } from "../models/index.js";

const testimonyController = {
	getAllTestimonies: async (req, res) => {
		const testimonies = await Testimony.findAll(
			{
				include: {
					model: Users,
					as: "user",
					attributes: ["id", "userName", "picture"],
				},
			}
		);
		res.json(testimonies);
	},
};

export default testimonyController;