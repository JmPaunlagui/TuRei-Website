const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require('dotenv').config({
    path: './config/index.env',
  });

// MongoDB
const connectDB = require('./config/db');
connectDB();

app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/user/', require('./routes/auth.route'));
app.use('/api/category/', require('./routes/category.route'));
app.use('/api/product/', require('./routes/product.route'));

// Page Not founded
app.use((req, res) => {
    res.status(404).json({
      msg: 'Page not founded',
    });
  });
  

  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);

  });