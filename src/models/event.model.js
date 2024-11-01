// event.model.js

// Import necessary dependencies
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize-client.js";

// Create a new Sequelize model
export class Event extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Event.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		picture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		creator_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "event",
	},
);



