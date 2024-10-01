import express from 'express';
import morgan from 'morgan';

import db from './config/db.js';
import flightRoutes from './routes/flightRoutes.js'
import userRoutes from './routes/userRoutes.js'


const app = express();

//Habilitamos en express la lectura de formularios
app.use(express.json())
app.use(morgan('dev'))

try {
    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la base de datos');
} catch (error) {
    console.log('Error' + error);
}
//Routing
app.use('/api', flightRoutes);
app.use('/api/', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});