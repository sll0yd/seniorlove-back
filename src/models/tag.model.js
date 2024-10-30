// tag.model.js

// Import necessary dependencies
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-client.js';

// Create a new Sequelize model
export class Tag extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'tag'
  }
)