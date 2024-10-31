import { z } from "zod";
import bcrypt from "bcrypt";
import { Users } from "../models/index.js";

const userSchema = z.object({
  gender: z.string().length(1),
  userName: z.string(),
  age: z.number().int(),
  email: z.string().email(),
  password: z.string().min(8),
});

const authController = {
  async createUser(req, res) {

    const result = userSchema.safeParse(req.body);

    if(!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const { gender, userName, age, email, password } = result.data;

    const userExists = await Users.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
  }
}