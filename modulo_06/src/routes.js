const express = require('express');
const routes = express.Router();

const productController = require('./app/controller/ProductController');

routes.get('/', (req, res) => {
  res.render('layout.njk');
});

routes.get('/products/create', productController.create);
routes.post('/products', productController.post);

// Alias
routes.get('/ads/create', (req, res) => {
  res.redirect('/products/create');
});

module.exports = routes;
