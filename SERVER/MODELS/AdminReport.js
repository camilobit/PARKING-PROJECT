import { DataTypes } from 'sequelize';

const adminReport = (sequelize) => {
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
    return adminReport
};
export default adminReport;