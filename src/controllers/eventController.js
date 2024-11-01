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
			// We want to retrieve the tags associated with the event
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
				{
					model: Users,
					as: "participants",
					attributes: ["id", "userName", "picture"],
					through: {
						attributes: [],
					},
				},
			],
		});

    // If the event does not exist, return a 404 status code with an error message
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}

		console.log(event.participants.length);
		res.json(event);
	},
};

export default eventController;