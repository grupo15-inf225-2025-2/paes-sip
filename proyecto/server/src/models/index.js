import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import PreguntaModel from './questionModel.js';
import EnsayoModel from './testModel.js';

const Pregunta = PreguntaModel(sequelize, DataTypes);
const Ensayo = EnsayoModel(sequelize, DataTypes);

Ensayo.belongsToMany(Pregunta, {
    through: 'Ensayo-Pregunta'
});

Pregunta.belongsToMany(Ensayo, {
    through: 'Ensayo-Pregunta'
});

export { sequelize, Pregunta, Ensayo };