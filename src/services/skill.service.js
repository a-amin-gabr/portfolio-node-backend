import {Skill} from "../models/skill.js";

export const getAllSkills = async () => {
    return Skill.find().lean()
}