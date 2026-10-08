import { Skill } from '../models/skill.js'

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, name: 1 }).lean();
        res.json(skills);
    } catch (error) {
        throw error;
    }
}
