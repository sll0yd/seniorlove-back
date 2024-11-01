// sentence.model.js

// Import necessary dependencies
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize-client.js";

// Create a new Sequelize model
export class Sentence extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Sentence.init(
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		color: {
			type: DataTypes.STRING(6),
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "sentences",
	},
);
