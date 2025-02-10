require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/products', require('./routes/ProductRoutes'));
app.use('/api/payments', require('./routes/PaymentRoutes'));
app.use('/api/orders', require('./routes/OrderRoutes'));
app.use('/api/orderitems', require('./routes/OrderItemRoutes'));
app.use('/api/locations', require('./routes/LocationRoutes'));
app.use('/api/groceries', require('./routes/GroceryRoutes'));
app.use('/api/dailymenus', require('./routes/DailyMenuRoutes'));
app.use('/api/customers', require('./routes/CustomerRoutes'));
app.use('/api/records', require('./routes/ContactUsRecordRoutes'));
app.use('/api/cashregister', require('./routes/CashRegisterRoutes'));

const PORT = process.env.PORT || 8080;

// Connecting to database and running the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });