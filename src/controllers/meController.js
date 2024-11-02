import { Users, Tag} from "../models/index.js";

const meController = {

	async getSelfProfile(req, res) {
		const user = await Users.findByPk(req.user.id, {
			include: {
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			},
		});
		res.json(user);
	},

};

export default meController;