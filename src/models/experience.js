import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true,
    enum: ['hybrid', 'remote', 'on-site']
    },
    start: { type: Date, required: true },
    end: { type: Date, default: null },
    points:  [
        {
            type: String,
            trim: true,
        }
    ],
    current: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Experience = mongoose.model("Experience", experienceSchema);