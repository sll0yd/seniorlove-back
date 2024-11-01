import { Users, Tag } from "../models/index.js";

const usersController = {
	async getAllUsers(req, res) {
		const users = await Users.findAll({
			include: {
				model: Tag,
				as: "tags",
			},
		});
		res.json(users);
	},
};

export default usersController;