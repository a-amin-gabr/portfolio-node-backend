import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import mongoose from 'mongoose';
import { connectDB } from './connect.js';
import { Profile } from '../models/profile.js';
import { Project } from '../models/project.js';
import { Skill } from '../models/skill.js';
import { Experience } from '../models/experience.js';
import { Certificate } from '../models/certificate.js';

const dataDirectory = path.resolve(process.cwd(), '../data');

async function readJson(fileName) {
    return JSON.parse(await fs.readFile(path.join(dataDirectory, fileName), 'utf8'));
}

function flattenSkills(groups) {
    return Object.entries(groups).flatMap(([category, values]) =>
        values.map((name) => ({ name, category })),
    );
}

function normalizeDate(value) {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) throw new Error(`Invalid date in seed data: ${value}`);
    return date;
}

async function seed() {
    await connectDB();
    const [profile, projects, experiences, certificates, skillsFile] = await Promise.all([
        readJson('profile.json'),
        readJson('projects.json'),
        readJson('experience.json'),
        readJson('certificates.json'),
        fs.readFile(path.join(dataDirectory, 'skills.yaml'), 'utf8'),
    ]);
    const skills = flattenSkills(yaml.load(skillsFile));

    await Promise.all([
        Profile.deleteMany({}),
        Project.deleteMany({}),
        Skill.deleteMany({}),
        Experience.deleteMany({}),
        Certificate.deleteMany({}),
    ]);
    await Profile.create(profile);
    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Experience.insertMany(experiences.map((item) => ({
        ...item,
        type: item.type.toLowerCase(),
        start: normalizeDate(item.start),
        end: item.end === 'Present' ? null : normalizeDate(item.end),
        current: item.end === 'Present',
    })));
    await Certificate.insertMany(certificates.map((item) => ({
        ...item,
        date: normalizeDate(item.date),
        expires: normalizeDate(item.expires),
    })));
    console.log(`Seeded ${skills.length} skills, ${projects.length} projects, ${experiences.length} experiences, and ${certificates.length} certificates.`);
}

try {
    await seed();
} catch (error) {
    console.error('Portfolio seed failed:', error);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
