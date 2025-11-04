export default (sequelize, DataTypes) => {
  return sequelize.define('Resultado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
