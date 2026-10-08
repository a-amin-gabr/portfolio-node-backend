import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    issuer:{ type: String, required: true, trim: true },
    date:{ type: Date, required: true },
    expires:{ type: Date },
    image: { type: String, trim: true, default: '' },
    credentialUrl: { type: String, trim: true, default: '' },
    status:{ type: String, required: true, trim: true, enum: ["active", "expired"]},
}, {
    timestamps: true
})

export const Certificate = mongoose.model("Certificate", certificateSchema);