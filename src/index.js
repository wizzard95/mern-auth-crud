
import app from './app.js';
import {connectDB} from './db.js';


connectDB();
const PORT = 3003; 

app.listen(PORT)
console.log("SERVIDOR CORRIENDO EN EL PUERTO:", PORT);