import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/merndb");
        console.log("✅ Conexión a MongoDB exitosa");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1); // Termina la app si no hay conexión
    }
};
/* import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/merndb");
       
    } catch (error) {
        console.log(error);
    }
;}
 */