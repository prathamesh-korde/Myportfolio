import express from 'express';
import { postContact } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact
router.post('/', postContact);

export default router;
