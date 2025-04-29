// src/models/index.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { User } from './User.js';
import { Order } from './Order.js';
import { OrderItem } from './OrderItem.js';
import { FoodItem } from './FoodItem.js';

// Define associations
User.hasMany(Order,       { foreignKey: 'userId',    as: 'orders' });
Order.belongsTo(User,     { foreignKey: 'userId',    as: 'user' });

Order.hasMany(OrderItem,  { foreignKey: 'orderId',   as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order,{ foreignKey: 'orderId',   as: 'order' });

FoodItem.hasMany(OrderItem,   { foreignKey: 'foodItemId', as: 'orderItems' });
OrderItem.belongsTo(FoodItem, { foreignKey: 'foodItemId', as: 'foodItem' });

// Export models and sequelize instance
export { sequelize, User, Order, OrderItem, FoodItem };