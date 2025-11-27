import Joi from 'joi';
import nodemailer from 'nodemailer';
import { Message } from '../models/Message.js';

// Validation schema for contact messages
const messageSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(5).max(2000).required()
});

// Create email transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured. Email notifications disabled.');
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// POST /api/contact
// Validate request body, store message in MongoDB, and send email notification
export const postContact = async (req, res, next) => {
  try {
    const { error, value } = messageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const msg = new Message(value);
    await msg.save();

    // Send email notification
    const transporter = createTransporter();
    if (transporter && process.env.NOTIFICATION_EMAIL) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New Portfolio Contact Message from ${value.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${value.name}</p>
          <p><strong>Email:</strong> ${value.email}</p>
          <p><strong>Message:</strong></p>
          <p>${value.message}</p>
          <hr>
          <p><small>Sent from your portfolio website</small></p>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError.message);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({ message: 'Message received' });
  } catch (err) {
    next(err);
  }
};
