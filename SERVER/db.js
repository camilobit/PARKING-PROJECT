import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url'; // Importa pathToFileURL
import { dirname, join } from 'path';
import { readdirSync } from 'fs';
import config from './config.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
//console.log(__dirname, 'ruta generada');

// Configuración de Sequelize
const sequelize = new Sequelize(
  config.PGDATABASE,
  config.PGUSER,
  config.PGPASSWORD,
  {
    host: config.PGHOST,
    port: config.PGPORT,
    dialect: 'postgres',
    logging: false,
    native: false,
  }
);

// Arreglo para almacenar definiciones de modelos
const modelDefiners = [];

// Carga de modelos dinámicamente usando rutas válidas para ESM
const loadModels = async () => {
  const files = readdirSync(join(__dirname, 'MODELS'))
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js');

  for (const file of files) {
    const filePath = pathToFileURL(join(__dirname, 'MODELS', file)).href; // Convierte a URL con file://
    const model = await import(filePath);
    //console.log('Modelo cargado:', model);
    modelDefiners.push(model);
  }
};

await loadModels();

// Luego continúa con la inicialización de los modelos
modelDefiners.forEach((model) => {
  const modelFunction = model.default || model[Object.keys(model)[0]];
  modelFunction(sequelize);
});

const models = sequelize.models; // Asegurar que todos los modelos están cargados correctamente aquí

//console.log('Modelos cargados:', Object.keys(models)); // Revisa que todos los modelos estén cargados

// Establece relaciones aquí después de cargar completamente los modelos
models.user.belongsToMany(models.vehicle, {
  through: 'user_vehicle',
  foreignKey: 'userId',
});
models.vehicle.belongsToMany(models.user, {
  through: 'user_vehicle',
  foreignKey: 'vehicleId',
});

models.user.belongsToMany(models.ticket, {
  through: 'user_ticket',
  foreignKey: 'userId',
});
models.ticket.belongsToMany(models.user, {
  through: 'user_ticket',
  foreignKey: 'ticketId',
});

models.user.belongsToMany(models.role, {
  through: 'user_role',
  foreignKey: 'userId',
});
models.role.belongsToMany(models.user, {
  through: 'user_role',
  foreignKey: 'roleId',
});

// Relaciones de uno a muchos
models.user.hasMany(models.ticket, { foreignKey: 'userId' });
models.vehicle.hasMany(models.ticket, { foreignKey: 'vehicleId' });
models.user.hasMany(models.payment, { foreignKey: 'userId' });
models.vehicle.hasMany(models.payment, { foreignKey: 'vehicleId' });

// Relaciones de uno a uno
models.user.hasOne(models.adminReport, { foreignKey: 'userId' });
models.user.hasOne(models.auditLog, { foreignKey: 'userId' });
models.vehicle.hasOne(models.performance, { foreignKey: 'vehicleId' });

// Relaciones de muchos a uno
models.payment.belongsTo(models.user, { foreignKey: 'userId' });
models.payment.belongsTo(models.vehicle, { foreignKey: 'vehicleId' });
models.adminReport.belongsTo(models.user, { foreignKey: 'userId' });
models.auditLog.belongsTo(models.user, { foreignKey: 'userId' });
models.performance.belongsTo(models.vehicle, { foreignKey: 'vehicleId' });

// Exportación de los modelos y la conexión
export { models, sequelize };

export default {
  conn: sequelize,
  models,
};


// const { PGUSER, PGPORT, PGDATABASE, PGHOST, PGPASSWORD } = config;


// const sequelize = new Sequelize({
//   username: PGUSER,
//   password: PGPASSWORD,
//   database: PGDATABASE,
//   host: PGHOST,
//   port: PGPORT,
//   dialect: 'postgres',
// });
// try {
//   await sequelize.sync();
//   console.log('Conexión exitosa');
// } catch (error) {
//   console.error('Error al conectar:', error.message);
// }

// export default sequelize;





// import pkg from 'pg';
// import { Module } from 'module';
// const { Pool } = pkg;

// export const pool = new Pool({
//   allowExitOnIdle: true,
//   user: PGUSER,
//   host: PGHOST,
//   password: PGPASSWORD,
//   database: PGDATABASE,
//   port: PGPORT,
// });

// try {
//   await pool.query("SELECT NOW ()");
//   console.log("La aplicación funciona");
// } catch (error) {
//   console.error("Error durante la consulta:", error.message);
// } finally {
//   pool.end();
// }

// console.log('PGPASSWORD:', process.env.PGPASSWORD);
// console.log('PGDATABASE:', process.env.PGDATABASE);
// console.log('PGUSER:', process.env.PGUSER);
// console.log('PGHOST:', process.env.PGHOST);
// console.log('PGPORT:', process.env.PGPORT);