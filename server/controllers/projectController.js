import { Project } from '../models/Project.js';

// GET /api/projects
// Fetch all projects from the database and return as JSON
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ _id: 1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};
