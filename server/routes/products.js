const express = require('express');
const { getProducts } = require('../controllers/Products');
const router = express.Router();

router.get('/products', getProducts);

module.exports = router;