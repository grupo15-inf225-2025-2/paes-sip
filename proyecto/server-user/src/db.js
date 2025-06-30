import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.AUTH_DB_URL || 'postgres://postgres:postgres@auth_db:5433/auth_db',
  {
    dialect: 'postgres',
    logging: false
  }
);

export default sequelize;