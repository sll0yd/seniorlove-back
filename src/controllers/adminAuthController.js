import { z } from "zod";
import bcrypt from "bcrypt";
import { Admin } from "../models/index.js";
import sanitizeHtml from "sanitize-html";

const adminSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const adminAuthController = {
  async registerAdmin(req, res) {
    const { userName, email, password } = req.body;

    const result = adminSchema.safeParse({ userName, email, password });

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const sanitizedUserName = sanitizeHtml(userName);
    const sanitizedEmail = sanitizeHtml(email);

    const adminExists = await Admin.findOne({ where: { email } });

    if (adminExists) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      userName : sanitizedUserName,
      email : sanitizedEmail,
      password: hashedPassword,
    });

    res.redirect("/admin/admins");

  },
  async loginAdmin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res
        .status(404)
        .json({ error: "Something went wrong, please try again" });
    }
    
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    req.session.admin = admin;

    res.render("dashboard", {
      admin: {
        id: admin.id,
        userName: admin.userName,
        email: admin.email,
      },
    });
  },
  async logoutAdmin(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Failed to destroy session:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie('connect.sid');
      console.log("Session destroyed, redirecting to /");
      res.redirect("/");
    });
  },
};

export default adminAuthController;