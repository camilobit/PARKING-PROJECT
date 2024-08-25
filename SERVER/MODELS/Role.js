// Este modelo separa los roles del usuario (user, user_admin, superAdmin) para una gestión más flexible.
//Campos clave: id, roleName, description.

import { DataTypes } from 'sequelize';

const role = (sequelize) => {
    sequelize.define('role', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        roleName: {
            type: DataTypes.STRING(50), // Ajusta la longitud según sea necesario
            allowNull: false, // Asegúrate de que el nombre del rol no sea nulo
            unique: true, // Los nombres de los roles deben ser únicos
        },
        description: {
            type: DataTypes.STRING(255), // Ajusta la longitud según sea necesario
            allowNull: true, // La descripción es opcional
        },
    },
    { timestamps: true });
    return role;
};
export default role;