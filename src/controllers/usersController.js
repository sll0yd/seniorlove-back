import { Users, Tag } from "../models/index.js";

const usersController = {
	async getAllUsers(req, res) {
		const users = await Users.findAll({
			include: {
				model: Tag,
				as: "tags",
        attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			},
		});
		res.json(users);
	},

	async getOneUser(req, res) {
		const user = await Users.findByPk(req.params.id, {
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

export default usersController;