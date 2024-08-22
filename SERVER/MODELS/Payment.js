import { DataTypes } from 'sequelize';

export default (sequelize) => {
    sequelize.define('payment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.ENUM('credit_card', 'debit_card', 'cash', 'other'),
            allowNull: false,
        },
        ticketId: {
            type: DataTypes.UUID,
            references: {
                model: 'tickets',
                key: 'id',
            },
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false,
        },
        userAdminId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true, // Puede ser nulo si no está asociado a un user_admin específico
        },
        superAdminId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true, // Puede ser nulo si no está asociado a un superAdmin específico
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    { timestamps: false }); // Usamos `timestamps: false` ya que `createdAt` ya está incluido
};
