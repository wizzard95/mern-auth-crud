
import app from './app.js';
import {connectDB} from './db.js';

const PORT = process.env.PORT || 3003;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("SERVIDOR CORRIENDO EN EL PUERTO:", PORT);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

startServer();