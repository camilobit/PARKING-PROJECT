//este modelo nos muestra la hora de entrada del vehiculo la fecha de creación de este ticket
// y la hora de salida del vehiculo puede o no ser nula, el monto que se pagó y se relaciona con
// ticketId, userir userAdminId SuperAdminId y 
import { DataTypes } from 'sequelize';

const ticket = (sequelize) => {
    sequelize.define('ticket', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        entryTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        exitTime: {
            type: DataTypes.DATE,
            allowNull: true, // Puede ser nulo si el vehículo aún no ha salido
        },
        ticketDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Establece la fecha actual por defecto
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    },
    { timestamps: true });
    return ticket;
};
export default ticket;