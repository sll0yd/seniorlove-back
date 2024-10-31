// index.js

// Import dotenv and express dependencies
import 'dotenv/config';
import express from 'express';
import router from './src/routes/router.js';

// Create an express app assigned to 'app' variable
const app = express();

// Define a route handler for the default home page
// app.get('/', (req, res) => {
//   res.send('Hello World!');
//   } 
// );

app.use(express.json());
app.use('/api', router);

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});