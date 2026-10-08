import mongoose from "mongoose";

const profileSchema = new mongoose.Schema( {
    name: { type: String, required: true, trim: true,},
    title: {type: String, required: true, trim: true,},
    headline: {type: String, required: true, trim: true,},
    about: {type: String, required: true, trim: true,},
    location: {type: String, required: true, trim: true,},
    email: {type: String, required: true, trim: true,},
    phone: {type: String, trim: true, default: '',},
    github: {type: String, required: true, trim: true,},
    linkedin: {type: String, required: true, trim: true,},
    portfolio: {type: String, trim: true, default: '',},
    cvUrl: {type: String, required: true, trim: true,},
}, {
    timestamps: true
})

export const Profile = mongoose.model("Profile", profileSchema);