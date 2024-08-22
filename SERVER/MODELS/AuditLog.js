//Registra acciones críticas realizadas en el sistema, como creación de usuarios, pagos, actualizaciones, y más. 
//Esto es útil para un superAdmin que quiera revisar las acciones realizadas por los user_admin.
//Campos clave: id, action, userId, targetId, targetType, createdAt.

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    sequelize.define('auditLog', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        action: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true, // Puede ser nulo si la acción no está asociada a un usuario específico
        },
        targetId: {
            type: DataTypes.UUID,
            allowNull: true, // Puede ser nulo si no hay un objetivo específico asociado
        },
        targetType: {
            type: DataTypes.STRING(50),
            allowNull: true, // Puede ser nulo si no hay un tipo de objetivo específico
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
};
