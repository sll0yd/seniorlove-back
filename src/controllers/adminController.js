import { Admin, Users, Event, Tag } from "../models/index.js";

const adminController = {
  renderDashboard(req, res) {
    res.render("dashboard", {
      admin: {
        id: req.session.admin.id,
        userName: req.session.admin.userName,
        picture: req.session.admin.picture,
      },
    });
  },
  async getAllUsers(req, res) {
    const users = await Users.findAll({
      attributes: ["id", "userName", "email", "role", "gender", "age", "picture"],
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    res.render("users", { users });
  },
  async getOneUser(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  
    const user = await Users.findByPk(id, {
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    res.json(user);
  },
  async deleteOneUser(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  
    const user = await Users.findByPk(id);
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    await user.destroy();
    res.json({ message: "User deleted" });
  },
  async getAllEvents(req, res) {
    const events = await Event.findAll({
      attributes: ["id", "title", "description", "location", "date", "picture"],
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    res.render("events", { events });
  },
  async getOneEvent(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
  
    const event = await Event.findByPk(id, {
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
  
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
  
    res.json(event);
  },
  async deleteOneEvent(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
  
    const event = await Event.findByPk(id);
  
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
  
    await event.destroy();
    res.json({ message: "Event deleted" });
  },
  async getAllAdmins(req, res) {
    const admins = await Admin.findAll();
    res.render("admins", { admins });
  },
  async deleteOneAdmin(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid admin ID" });
    }
  
    const admin = await Admin.findByPk(id);
  
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
  
    await admin.destroy();
    res.json({ message: "Admin deleted" });
  },
};

export default adminController;