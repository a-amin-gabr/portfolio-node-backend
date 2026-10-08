import express from 'express';
import skillRoutes from './routes/skill.routes.js';
import certificateRoutes from './routes/certificate.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import profileRoutes from './routes/profile.routes.js';
import projectRoutes from './routes/project.routes.js';


const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN || 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Portfolio API'}));
app.use('/api/skills', skillRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});
app.use((error, req, res, next) => {
    console.error(error);
    if (res.headersSent) return next(error);

    const status = error.name === 'ValidationError' ? 400 : error.statusCode || 500;
    res.status(status).json({
        message: status === 500 ? 'An unexpected server error occurred' : error.message,
    });
});

export default app;