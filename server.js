const express = require('express');
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/auth', authRoutes);

// Define user routes
app.use('/user', userRoutes);

//define blog Routes
app.use('/blog', blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});