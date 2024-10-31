// authController.js

// Import the necessary dependencies
import { z } from "zod";
import bcrypt from "bcrypt";
import { Users } from "../models/index.js";

// Define the user schema with the zod library
// The schema defines the shape of the data that the user must provide
const userSchema = z.object({
  gender: z.string().length(1),
  userName: z.string(),
  age: z.number().int(),
  email: z.string().email(),
  password: z.string().min(8),
});

// Declare the authController object
const authController = {

  // Define the createUser method
  async createUser(req, res) {

    // Validate the request body against the user schema
    const result = userSchema.safeParse(req.body);

    // If the validation fails, return a 400 status code with the error message
    if(!result.success) {
      return res.status(400).json({ error: result.error });
    }

    // Destructure the validated request body into individual variables
    const { gender, userName, age, email, password } = result.data;

    // Check if the user already exists in the database
    const userExists = await Users.findOne({ where: { email } });

    // If the user already exists, return a 409 status code with the error message
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // If the user does not exist, hash the password and create a new user
    try {

      // Hash the password using bcrypt
      // The bcrypt library is used to hash passwords
      // The saltRounds parameter is the number of rounds used to generate the hash (here 10)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with the validated data
      const userData = {
        gender,
        userName,
        age,
        email,
        // Give the password property the hashed password
        password: hashedPassword,
      };

      // Create a new user in the database
      // The Users model is used to create a new user
      // The create method creates a new user with the provided data (here userData)
      const user = await Users.create(userData);
      console.log(user);

      // Return a 201 status code with a success message
      return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
      // If an error occurs, return a 500 status code with the error message
      return res.status(500).json({ error: error.message });
    }

  }
}

export default authController;