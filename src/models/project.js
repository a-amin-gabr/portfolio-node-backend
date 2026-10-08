import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    tech:  [
        {
            type: String,
            trim: true,
        }
    ],
    github: { type: String, trim: true, default: '' },
    live: { type: String, trim: true, default: '' },
    image: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    status: { type: String, required: true, trim: true, enum: ['live', 'in-progress', 'archived']},
    highlights: [
            {
                type: String,
                trim: true,
            }
    ],
}, {
    timestamps: true
})

export const Project = mongoose.model("Project", projectSchema);