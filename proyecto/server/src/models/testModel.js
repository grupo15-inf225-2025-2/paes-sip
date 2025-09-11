import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Ensayo = sequelize.define('Ensayo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preguntas: {
    type: DataTypes.JSONB,    // <-- JSONB en lugar de JSON o ARRAY
    allowNull: false,
    defaultValue: []
  }
});

export default Ensayo;
