// index.js

// Import dotenv and express dependencies
import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as apiRouter } from "./src/routes/index.js";

// Create an express app assigned to 'app' variable
const app = express();

// Define a route handler for the default home page
// app.get('/', (req, res) => {
//   res.send('Hello World!');
//   }
// );

// Enable All CORS Requests
app.use(cors("*"));

// Parse JSON request bodies
app.use(express.json());
app.use("/api", apiRouter);

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server on port 3000
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});