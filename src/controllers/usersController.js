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
		const id = Number.parseInt(req.params.id);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user ID" });
		}

		const user = await Users.findByPk(id, {
			include: {
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);
	},
};

export default usersController;