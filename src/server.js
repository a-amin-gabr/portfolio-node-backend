import app from './app.js';
import { connectDB } from './db/connect.js';

const port = Number(process.env.API_PORT || 3000);

try {
    await connectDB();
    app.listen(port, () => console.log(`Portfolio API listening on port ${port}`));
} catch (error) {
    console.error('Unable to start the portfolio API:', error.message);
    process.exitCode = 1;
}
