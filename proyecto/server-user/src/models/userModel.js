import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  escuela: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  profesor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true, // Opcional: añade createdAt y updatedAt
  tableName: 'usuarios' // Si el nombre de la tabla en BD es diferente al del modelo
});

export default usuario;