import dotenv from 'dotenv';
import { pool } from "../DATABASE/ConnectionPostgreSQL.js";

dotenv.config();

const getLanguajes = async () => {
    try {
        const result = await pool.query("SELECT id, name, developers, enabled FROM dbparking;");
        console.table(result.rows);
        console.log("La conexión funciona");
    } catch (error) {
        console.error("Error durante la consulta:", error);
    }
};

getLanguajes();
