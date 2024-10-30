// message.model.js

// Import necessary dependencies
import {Model, DataTypes} from 'sequelize';
import {sequelize} from './sequelize-client.js';

// Create a new Sequelize model
export class Message extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Message.init(
  {
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'message'
  }
)