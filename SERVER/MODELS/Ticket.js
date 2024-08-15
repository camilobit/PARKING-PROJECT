import { DataTypes } from 'sequelize';

export default (sequelize) => {
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
        },
        validatedWith: {
            type: DataTypes.ENUM('factura comercial', 'efectivo', 'gimnasio', 'mixto', 'exito', 'panamericana', 'homecentry', 'cine', 'hym', 'bodytech', 'smartfit'),
            allowNull: true, // Puede ser nulo si no hay validación
        },
    },
    { timestamps: true });
};
