const hostname = '127.0.0.1';
const port = 5000;

const express = require('express');
const categoryRoute = require('./routes/categoryRoute.js');
const productsRoute = require('./routes/productsRoute.js');
const saltFeatureImageRoute = require('./routes/saltFeatureImageRoute.js');
const pastaFeatureImageRoute = require('./routes/pastaFeatureImageRoute.js');
const wheatFeatureImageRoute = require('./routes/wheatFeatureImageRoute.js');
const contactRoutes = require('./routes/contactRoutes.js');

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const connectDB = require('./db');

connectDB();

//Routes
app.use('/api/category', categoryRoute);
app.use('/api/product', productsRoute);
app.use('/api/salt-feature-image', saltFeatureImageRoute);
app.use('/api/pasta-feature-image', pastaFeatureImageRoute);
app.use('/api/wheat-feature-image', wheatFeatureImageRoute);
app.use('/api/contact', contactRoutes);
app.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`);
});
