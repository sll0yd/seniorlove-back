import { z } from 'zod';
import { Message, Users } from '../models/index.js';
import { Op } from 'sequelize';

const schema = z.object({
  content: z.string(),
});

const messageController = {
  async createMessage (req, res) {

    const sender = parseInt(req.userId);
    const receiver = parseInt(req.params.receiverId);
  
    const { error } = schema.safeParse(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    if (sender === receiver) {
      return res.status(400).json({ error: "Sender and receiver cannot be the same" });
    }

    const content = req.body.content;

    const newMessage = await Message.create({
      content,
      sender_id: sender,
      receiver_id: receiver,
    });

    res.status(201).json(newMessage);
  },
  async getMessages (req, res) {
    const sender = parseInt(req.userId);
    const receiver = parseInt(req.params.receiverId);

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {sender_id: sender, receiver_id: receiver}, 
          {sender_id: receiver, receiver_id: sender}
        ]
      },
      include: [
        {
          model: Users,
          as: "sender",
          attributes: ["id", "userName", "picture"],
        },
        {
          model: Users,
          as: "receiver",
          attributes: ["id", "userName", "picture"],
        },
      ],
    });

    if (messages.length === 0) {
      return res.status(404).json({ error: "No messages yet" });
    }

    res.status(200).json(messages);
  },
};

export default messageController;