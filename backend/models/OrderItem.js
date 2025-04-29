import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { Order } from './Order.js';  // import to associate

export const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  foodItemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'OrderItems',
  timestamps: false
});

// Associations will be set up after both models are defined
