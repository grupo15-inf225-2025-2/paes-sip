import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Pregunta = sequelize.define('Pregunta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asignatura: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tematica: {
    type: DataTypes.STRING,
    allowNull: false
  },
  habilidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pregunta: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  opciones: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  correcta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  puntos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  etiquetas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  timestamps: true
});

export default Pregunta;