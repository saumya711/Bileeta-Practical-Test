const express = require('express');
const { createProductDetails, getCustomerProductDetails, getCustomerProductById, getProductsByCustomer, deleteCustomerProduct, updateCustomerProduct } = require('../controllers/CustomerProductController');
const router = express.Router();

router.post('/customer-product', createProductDetails);
router.get('/customer-products', getCustomerProductDetails);
router.get('/customer-product/:ID', getCustomerProductById);
router.get('/product-by-customer/:CustomerCode', getProductsByCustomer);
router.delete('/customer-product/:ID', deleteCustomerProduct);
router.put('/customer-product/:ID', updateCustomerProduct);

module.exports = router;