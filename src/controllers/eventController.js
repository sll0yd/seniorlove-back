import { z } from "zod";
import { Event, Tag, Users } from "../models/index.js";

const eventController = {
	async getAllEvents(req, res) {
		const events = await Event.findAll({
			// We want to retrieve the tags associated with the events
			include: [
				{
					// Specify the model to use
					model: Tag,
					// Specify the alias to use (refer to the association in the models)
					as: "tags",
					// Specify the attributes to retrieve from the Tag model
					attributes: ["id", "name"],
					// Define the attributes to retrieve from the intermediate model (e.g. events_tags)
					// Not doing this will return all attributes from the intermediate model by default and we want to exclude them
					through: {
						// In this case, we don't need any attributes from the intermediate model, so we exclude them using an empty array
						attributes: [],
					},
				},
			],
		});
		res.json(events);
	},

	async getOneEvent(req, res) {
    // Get the event ID from the URL
		const id = Number.parseInt(req.params.id);

    // Check if the ID is a valid number
		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid event ID" });
		}

		const event = await Event.findByPk(id, {
			// We want to retrieve the tags associated with the event, as well as the participants and the creator
			include: [
				{
					// Specify the model to use
					model: Tag,
					// Specify the alias to use (refer to the association in the models)
					as: "tags",
					// Specify the attributes to retrieve from the Tag model
					attributes: ["id", "name"],
					// Define the attributes to retrieve from the intermediate model (e.g. events_tags)
					// Not doing this will return all attributes from the intermediate model by default and we want to exclude them
					through: {
						// In this case, we don't need any attributes from the intermediate model, so we exclude them using an empty array
						attributes: [],
					},
				},
				// Include the participants of the event
				{
					model: Users,
					as: "participants",
					attributes: ["id", "userName", "picture"],
					through: {
						attributes: [],
					},
				},
				// Include the creator of the event
				{
					model: Users,
					as: "creator",
					attributes: ["id", "userName", "picture"],
				}
			],
		});

    // If the event does not exist, return a 404 status code with an error message
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}

		console.log(event.participants.length);
		res.json(event);
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
		const creator_id = req.user.id;

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
};

export default eventController;