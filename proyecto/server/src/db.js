import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  hostname: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME
};

const sequelize = new Sequelize(
  `postgres://${dbConfig.user}:${dbConfig.pass}@${dbConfig.hostname}:${dbConfig.port}/${dbConfig.name}`,
  {
    dialect: 'postgres',
    logging: false
  }
);

export default sequelize;