import mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';

export async function connectDB() {
    const MAX_TRIES = 5;
    const DELAY_MS = 3000;
    const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/portfolio';

    for (let tries = 1; tries <= MAX_TRIES; tries++) {
        try {
            await mongoose.connect(DB_URI);
            console.log('Connected to DB');
            return;
        } catch (error) {
            console.error(`Mongodb connection attempt ${tries}/${MAX_TRIES} failed:`, error.message);
            if (tries === MAX_TRIES) {
                throw new Error('Could not connect to MongoDB after the configured retries');
            }
            const delay = DELAY_MS * tries * 2;
            await setTimeout(delay);
        }
    }
}
