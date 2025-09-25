//aqui creamos el servidor

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.routes.js"
import tasksRoutes from "./routes/tasks.routes.js";

// Para servir archivos estáticos en producción
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))

app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', tasksRoutes)

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

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