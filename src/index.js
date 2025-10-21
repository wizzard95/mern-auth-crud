
import app from './app.js';
import {connectDB} from './db.js';
import {PORT} from './config.js';

const startServer = async () => {
    try {
        console.log('🚀 Iniciando servidor...');
        await connectDB();
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Servidor corriendo en puerto: ${PORT}`);
            console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

startServer();