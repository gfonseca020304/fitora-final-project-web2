// filepath: backend/models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});