import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-client.js';

// Create a new Sequelize model
export class Testimony extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Testimony.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'testimonies'
  }
)