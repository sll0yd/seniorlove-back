// index.js

// Import dotenv and express dependencies
import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as apiRouter } from "./src/routers/index.js";

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

// Serve static files from the uploads directory (for profile pictures)
app.use("/uploads", express.static("./uploads"));

// Mount the API router at the /api endpoint
app.use("/api", apiRouter);

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server on port 3000
app.listen(port, () => {
	console.log(`Server is running on port ${process.env.BASE_URL}`);
});