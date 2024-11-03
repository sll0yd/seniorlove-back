import { Users, Tag} from "../models/index.js";

const meController = {

	async getSelfProfile(req, res) {
		const id = Number.parseInt(req.user.id, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
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
	async updateSelfProfile(req, res) {
		
		const id = Number.parseInt(req.user.id, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		
		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const { userName, age, picture, hometown, bio } = req.body;

		user.userName = req.body.userName || user.userName;
		user.age = Number.parseInt(req.body.age) || user.age;
		user.picture = req.body.picture || user.picture;
		user.hometown = req.body.hometown || user.hometown;
		user.bio = req.body.bio || user.bio;

		user.save();

		res.json(user);
	},

	async deleteSelfProfile(req, res) {
		const id = Number.parseInt(req.user.id, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		await Users.destroy({ where: { id } });
		
		res.json({ message: "User deleted" });
	},

};

export default meController;