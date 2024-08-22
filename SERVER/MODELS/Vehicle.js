//almacenasmos la placa de un vehiculo al momento de hacer la consulta para guardar esta info y cruzarla con modelos tickes, user y demás.

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    sequelize.define('vehicle', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        licensePlate: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
            validate: {
                len: [6, 10], // Ajustado para permitir placas entre 6 y 10 caracteres (ajustar según necesidad)
                is: /^[A-Z0-9-]+$/i // Validación para asegurar que solo contiene letras, números y guiones
            },
        },
    },
        { timestamps: true });
};
