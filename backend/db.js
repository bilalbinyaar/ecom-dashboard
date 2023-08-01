// db.js

const mongoose = require('mongoose');

const username = 'dual';
const password = 'itisdual';
const clusterName = 'cluster007';
// const dbName = 'your_database_name';

const uri = `mongodb+srv://${username}:${password}@${clusterName}.tbac97p.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas!');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
