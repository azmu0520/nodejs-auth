const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const postRoute = require('./routes/post');

dotenv.config();
// Connect to DB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.URL_DB, () => {
  console.log('connected to db');
});

// Middleware
app.use(express.json());

// Import Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server is runing'));
