import { DataTypes } from 'sequelize';

export default (sequelize) => {
    sequelize.define('adminReport', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        reportType: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        reportData: {
            type: DataTypes.JSONB, // Usar JSONB para almacenar datos estructurados
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
};
