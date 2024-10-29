// users.model.js

// Import necessary dependencies
import { Model, Database } from 'sequelize';
import { sequelize } from './sequelize-client.js';

// Create a new Sequelize model
export class Users extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Users.init(
  {
    username: {
      type: Database.STRING,
      allowNull: false,
      unique: true
    },
    gender: {
      type: Database.STRING,
      allowNull: false
    },
    picture: {
      type: Database.STRING
    },
    email: {
      type: Database.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Database.STRING,
      allowNull: false
    },
    age: {
      type: Database.INTEGER,
      allowNull: false
    },
    hometown: {
      type: Database.STRING
    },
    bio: {
      type: Database.STRING
    }
  },
  {
    sequelize,
    modelName: 'users',
  }
)