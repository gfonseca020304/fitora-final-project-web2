import express from 'express';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import cors from 'cors'
import { faker } from '@faker-js/faker';
import { FoodItem } from './models/FoodItem.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({extended: true}));

// Routes
app.use('/auth', authRoutes);
app.use('/foods', foodRoutes);
app.use('/cart', cartRoutes);

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server and sync database
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ alter: true }); 
    console.log('Database synchronized.');

    // SEED MENU
    const count = await FoodItem.count();
    if (count === 0) {
      console.log('Seeding random menu items…');
      const items = Array.from({ length: 15 }).map(() => ({
        name:        faker.food.dish(),             // e.g. "Incredible Soft Pizza"
        description: faker.food.description(),      // e.g. "Ergonomic ..."
        price:       Math.floor(Math.random() * 100) + 1,  // random between $5–$25
        calories:    Math.floor(Math.random() * 1000) + 1,
      }));
      await FoodItem.bulkCreate(items);
      console.log('Menu seeded.');
    }
  } catch (error) {
    console.error('Error starting server:', error);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
})();
