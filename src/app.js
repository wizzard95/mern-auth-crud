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
            'https://mern-crud-auth-six.vercel.app'
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