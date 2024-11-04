import { Users, Tag, Event} from "../models/index.js";

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
	async assignTagToSelfProfile(req, res) {
		const id = Number.parseInt(req.user.id, 10);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
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

		// Check if the tag is already assigned to the user
		// If the tag is already assigned, return a 400 status code with an error message
		// The some method checks if at least one element in the array satisfies the condition
		if (user.tags.some((t) => t.id === tag.id)) {
			return res.status(400).json({ error: "Tag already assigned" });
		}

		// Add the tag to the user using the addTag method
		await user.addTag(tag);

		res.json({ message: "Tag added" });
	},	
	async removeTagFromSelfProfile(req, res) {
		const id = Number.parseInt(req.user.id, 10);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
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

		// Check if the tag is assigned to the user
		// If the tag is not assigned, return a 400 status code with an error message
		// The some method checks if at least one element in the array satisfies the condition
		if (!user.tags.some((t) => t.id === tag.id)) {
			return res.status(400).json({ error: "Tag not assigned" });
		}

		// Remove the tag from the user using the removeTag method
		await user.removeTag(tag);

		res.json({ message: "Tag removed" });
	},
	async getSelfCreatedEvents(req, res) {
		// Get the user id from the req.user object
		// Convert the user id to a number
		const id = Number.parseInt(req.user.id, 10);

		// Check if the user id is a number
		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		
		// Find the user in the database by id
		// Include the created events in the response
		const user = await Users.findByPk(id, {
			include: {
				model: Event,
				// Specify the alias of the association
				// In this case, we want to retrieve the created events
				// The name of the association is "createdEvents"
				as: "createdEvents",
				attributes: ["id", "title", "description", "date", "location", "picture"],
			},
		});
		
		// Check if the user exists
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if the user has created events
		// If the user has no created events, return a 404 status code with an error message
		if (user.createdEvents.length === 0) {
			return res.status(404).json({ error: "User has no created events" });
		}

		// Return the created events
		res.json(user.createdEvents);
	},
};

export default meController;