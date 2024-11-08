import { z } from "zod";
// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files
// The multer middleware is used to upload files to the server
// The multer middleware is configured with the storage configuration in the utils/storageService.js file
// The storage configuration specifies the destination and filename of the uploaded files
import multer from "./utils/storageService.js";
import { Users, Tag, Event} from "../models/index.js";

const meController = {

	async getSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		
		const user = await Users.findByPk(id, {
			attributes: {include: ["password"]},
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
		
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		
		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const { userName, age, picture, hometown, bio, password } = req.body;

		user.userName = req.body.userName || user.userName;
		user.age = Number.parseInt(req.body.age) || user.age;
		user.picture = req.body.picture || user.picture;
		user.hometown = req.body.hometown || user.hometown;
		user.bio = req.body.bio || user.bio;
		// user.password = bcrypt.hashSync(req.body.password, 10) || user.password;

		user.save();

		res.json(user);
	},
	async uploadProfilePicture(req, res) {
		// Get the user id from the req.user object (the authenticated user)
		const id = Number.parseInt(req.userId, 10);

		// Check if the user id is a number
		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		// Find the user in the database by id
		const user = await Users.findByPk(id);

		// Check if the user exists
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Create an instance of the multer middleware with the storage configuration and the field name "picture" (must match the name attribute in the form)
		// The single method is used to upload a single file
		const upload = multer.single("picture");

		// Call the multer middleware with the request, response, and an error handler
		// The error handler is called if there is an error during the upload
		upload(req, res, (err) => {
			// If there is an error, return a 500 status code with an error message
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			// If there is no file, return a 400 status code with an error message
			if (!req.file) {
				return res.status(400).json({ error: "No file uploaded" });
			}

			// If the file is uploaded successfully, update the user's picture
			// The picture property is updated with the path to the uploaded file
			// The BASE_URL environment variable is used to determine the base URL of the application
			user.picture = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

			// Save the user
			user.save();

			// Return the updated user
			res.json(user);
		});
	},
	async deleteSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		await Users.destroy({ where: { id } });
		
		res.json({ message: "User deleted" });
	},
	async assignTagToSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);
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
	async createAnEvent(req, res) {
		// Define the schema for the request body
		const eventSchema = z.object({
			title: z.string().min(1).optional(false),
			picture: z.string().optional(),
			description: z.string().min(1).optional(false),
			date: z.string().optional(false),
			location: z.string().min(1).optional(false),
		});

		// Validate the request body against the schema
		const { error } = eventSchema.parse(req.body);

		// If the validation fails, return a 400 status code with the error message
		if (error) {
			return res.status(400).json({ error: error.message });
		}

		// Destructure the validated request body into individual variables
		const { title, picture, description, date, location } = req.body;
		// Get the creator ID from the authenticated user
		const creator_id = req.userId;

		// Create a new event with the validated data
		const event = await Event.create({
			title,
			picture,
			description,
			date,
			location,
			creator_id,
		});

		// Return the created event
		res.json(event);
	},
	async removeTagFromSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);
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
		const id = Number.parseInt(req.userId, 10);

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
	async getOneOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			}, {
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		res.json(eventToBeFind);
	},
	async uploadEventPicture(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: {
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}
		
		const upload = multer.single("picture");

		upload(req, res, (err) => {
		if (err) {
				return res.status(500).json({ error: err.message });
			}

		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		eventToBeFind.picture = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

		eventToBeFind.save();

		res.json({ message: "Event picture uploaded" });
	});
	},
	async updateOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: {
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		const { title, description, date, location, picture } = req.body;

		eventToBeFind.title = title || eventToBeFind.title;
		eventToBeFind.description = description || eventToBeFind.description;
		eventToBeFind.date = date || eventToBeFind.date;
		eventToBeFind.location = location || eventToBeFind.location;
		eventToBeFind.picture = picture || eventToBeFind.picture;

		await eventToBeFind.save();

		res.json(eventToBeFind);
	},
	async deleteOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}	

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: {
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		await eventToBeFind.destroy();

		res.json(eventToBeFind);
	},
	async addTagToOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}	

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
			{
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		eventToBeFind.addTag(tag);

		res.json(eventToBeFind);
	},
	async removeTagFromOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}	

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
			{
				model: Tag,
				as: "tags",
				attributes: ["id", "name", "color"],
				through: {
					attributes: [],
				},
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		if (!eventToBeFind.tags.some((t) => t.id === tag.id)) {
			return res.status(400).json({ error: "Tag not assigned" });
		}

		eventToBeFind.removeTag(tag);

		res.json(eventToBeFind);
	},
};

export default meController;