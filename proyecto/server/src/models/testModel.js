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
    type: DataTypes.TEXT
  },
  puntos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preguntas: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Ensayo;