import {Certificate} from "../models/certificate.js";

export const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ date: -1 }).lean();
        res.json(certificates);
    } catch (error) {
        throw error;
    }
}
