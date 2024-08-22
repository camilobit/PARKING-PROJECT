//Almacena métricas de desempeño de los user_admin, como la cantidad de pagos gestionados, el monto total cobrado, etc. 
//Este modelo es útil para que los superAdmin revisen el rendimiento de los user_admin.
//Campos clave: id, userAdminId, totalPayments, totalAmountCollected, createdAt, updatedAt.

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    sequelize.define('performance', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        userAdminId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false,
        },
        totalPayments: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        totalAmountCollected: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
};
