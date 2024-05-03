const mongoose = require('mongoose');
require('dotenv').config();

const options = {
  auth: {
    authSource: 'admin'
  },
  poolsize: process.env.MONGO_POOL,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS
}

mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log('Connected to MongoDB!');
  }).catch(error => {
    console.error('Error connecting to MongoDB: ', error);
    process.exit(1);
  });

mongoose.set('bufferCommands', false);