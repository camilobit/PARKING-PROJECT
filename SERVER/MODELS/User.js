// este modelo hace referencia a los usuarios y tiene dos validaciones para usuarios de useradmin y superadmin

import { DataTypes, UUID } from 'sequelize';

const user = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false,
            validate: {
                len: [1, 25], // Nombre debe tener entre 1 y 25 caracteres
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true, // Validación de formato de email
            },
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                len: [10, 10], // Teléfono debe tener 10 dígitos
                is: /^\d{10}$/, // Validación de que solo contenga números
            },
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [3, 50], // Ciudad debe tener entre 3 y 50 caracteres
            },
        },
        user_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        superAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        firebaseId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
        { timestamps: true });
        return user;
};
export default user;