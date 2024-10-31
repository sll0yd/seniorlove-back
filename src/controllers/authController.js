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