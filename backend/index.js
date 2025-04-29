import app from './app.js';
import { sequelize } from './config/db.js';

const PORT = process.env.PORT || 4000;
sequelize.sync()                // creates dev.sqlite + tables
  .then(() => console.log('DB synced'))
  .then(() => app.listen(PORT, () => console.log(`Listening on ${PORT}`)))
  .catch(console.error);
