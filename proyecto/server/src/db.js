import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/myapp',
  {
    dialect: 'postgres',
    logging: false
  }
);

export default sequelize;