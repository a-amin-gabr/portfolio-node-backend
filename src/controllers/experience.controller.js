import {Experience} from "../models/experience.js";

export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ start: -1 }).lean();
        res.json(experiences);
    } catch (error) {
        throw error;
    }
}
