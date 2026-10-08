import {Project} from "../models/project.js";

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ featured: -1, createdAt: -1 }).lean();
        res.json(projects);
    } catch (error) {
        throw error;
    }
}
