import {Profile} from "../models/profile.js";

export const getProfileInfo = async (req, res) => {
    try {
        const profileInfo = await Profile.findOne();
        if (!profileInfo) {
            return res.status(404).json({
                message: 'Profile not found',
            })
        }
        res.json(profileInfo);
    } catch (error) {
        throw error;
    }
}
