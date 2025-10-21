export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'development-secret-change-me';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/merndb';

// Configuración para producción
export const PORT = process.env.PORT || 3003;
export const NODE_ENV = process.env.NODE_ENV || 'development';