// Configuración específica para producción
export const productionConfig = {
    // Configuración de CORS para producción
    corsOrigins: [
        'https://mern-crud-auth-frontend.onrender.com',
        'https://mern-crud-auth-backend.onrender.com',
        'https://mern-crud-auth-frontend.vercel.app',
        'https://mern-crud-auth-six.vercel.app'
    ],
    
    // Configuración de base de datos
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    },
    
    // Configuración del servidor
    serverConfig: {
        port: process.env.PORT || 3003,
        host: '0.0.0.0'
    }
};
