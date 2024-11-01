// tagController.js

// Import the Tag model
import { Tag } from '../models/index.js'

// Declare the tagController object
const tagController = {
  async getAllTags(req, res) {
    // Find all tags in the database
    const tags = await Tag.findAll()

    // Return the tags as JSON
    res.json(tags)
  }
};

// Export the tagController object
export default tagController