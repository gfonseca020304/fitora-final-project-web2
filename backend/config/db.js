// src/config/db.js
import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize({
  dialect:  process.env.DB_DIALECT   || 'sqlite',
  storage:  process.env.DB_STORAGE   || './dev.sqlite',
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging:  false,
});

export default sequelize;
