import { Users, Tag } from "../models/index.js";
import sanitizeHtml from "sanitize-html";

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

		const sanitizedUsers = users.map(user => ({
			id: user.id,
			userName: sanitizeHtml(user.userName),
			email: sanitizeHtml(user.email),
			role: sanitizeHtml(user.role),
			gender: sanitizeHtml(user.gender),
			age: user.age,
			picture: sanitizeHtml(user.picture),
			hometown: sanitizeHtml(user.hometown),
			tags: user.tags.map(tag => ({
				id: tag.id,
				name: sanitizeHtml(tag.name),
			})),
		}));
		res.json(sanitizedUsers);
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

		const sanitizedUser = {
			id: user.id,
			userName: sanitizeHtml(user.userName),
			email: sanitizeHtml(user.email),
			role: sanitizeHtml(user.role),
			gender: sanitizeHtml(user.gender),
			age: user.age,
			picture: sanitizeHtml(user.picture),
			hometown: sanitizeHtml(user.hometown),
			bio: sanitizeHtml(user.bio),
			tags: user.tags.map(tag => ({
				id: tag.id,
				name: sanitizeHtml(tag.name),
			})),
		};

		res.json(sanitizedUser);
	},
};

export default usersController;