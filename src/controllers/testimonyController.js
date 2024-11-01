import { Testimony } from "../models/testimony.model.js"

const testimonyController = {
  getAllTestimonies: async (req, res) => {
    const testimonies = await Testimony.findAll();
    res.json(testimonies);
  },
};

export default testimonyController;