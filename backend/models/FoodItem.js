// src/models/FoodItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

export const FoodItem = sequelize.define('FoodItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'FoodItems',
  timestamps: false // or true if you want createdAt/updatedAt
});
