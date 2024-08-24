import "dotenv/config";
import express from 'express';
import { sequelize } from './db.js'; // Asegúrate de exportar `sequelize` desde tu archivo `db.js`

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de middlewares
app.use(express.json()); // Para analizar cuerpos JSON

// Configuración de CORS (si es necesario)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Actualiza según el dominio desde el cual harás las solicitudes
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Rutas
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Sincronizar la base de datos y luego iniciar el servidor
const startServer = async () => {
  try {
    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ force: false }); // Cambia a `true` solo en desarrollo si deseas reiniciar la base de datos

    // Probar la conexión
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

startServer();
