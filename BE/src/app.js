


const express = require('express');
const cors = require('cors'); // ← Import cors
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors()); // ← Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Error handling
app.use(errorHandler);

module.exports = app;

