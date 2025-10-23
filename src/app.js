//aqui creamos el servidor

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import tasksRoutes from "./routes/tasks.routes.js";


const app = express()
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://mern-crud-auth-frontend.vercel.app',
            'https://mern-auth-crud-pi.vercel.app',
            'https://mern-crud-auth-six.vercel.app',
            'https://mern-crud-auth-frontend.onrender.com',
            'https://mern-crud-auth.onrender.com',
            'https://mi-mern-backend.onrender.com'
        ];
        
        // Permitir requests sin origin (como Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))

app.use(cookieParser())

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'MERN CRUD Auth API',
        status: 'running',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/register, /api/login, /api/verify',
            tasks: '/api/tasks'
        }
    });
});

app.use('/api', authRoutes)
app.use('/api', tasksRoutes)

// El frontend se sirve desde Vercel, no desde aquí

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ 
        message: 'Ruta no encontrada',
        path: req.originalUrl,
        method: req.method
    });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

export default app;