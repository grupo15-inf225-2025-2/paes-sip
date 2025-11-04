import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import PreguntaModel from './questionModel.js';
import EnsayoModel from './testModel.js';
import ResultadoModel from './resultModel.js';

const Pregunta = PreguntaModel(sequelize, DataTypes);
const Ensayo = EnsayoModel(sequelize, DataTypes);
const Resultado = ResultadoModel(sequelize, DataTypes);


Ensayo.hasMany(Resultado, {
  foreignKey: 'ensayoId',
  as: 'resultados',
});

Resultado.belongsTo(Ensayo, {
  foreignKey: 'ensayoId',
  as: 'ensayo',
});


export { sequelize, Pregunta, Ensayo, Resultado };