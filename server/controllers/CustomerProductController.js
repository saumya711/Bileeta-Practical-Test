const sql = require('mssql/msnodesqlv8');
var config = require('../dbconfig');
const util = require('util');

const executeAsync = util.promisify(sql.Request.prototype.execute);

exports.createProductDetails = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send('Invalid request body.');
        }

        const {
            CustomerCode,
            ProductCode,
            Quantity,
            UnitPrice,
            TotalAmount
        } = req.body;

        const request = new sql.Request();

        request.input('CustomerCode', sql.VarChar(10), CustomerCode);
        request.input('ProductCode', sql.VarChar(20), ProductCode);
        request.input('Quantity', sql.Int, Quantity);
        request.input('UnitPrice', sql.Decimal(10, 2), UnitPrice);
        request.input('TotalAmount', sql.Decimal(10, 2), TotalAmount);
        const result = await executeAsync.call(request, 'CreateProductDetails');

        console.log(result);
        res.status(200).send('Order added successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting order.');
    }
};


exports.getCustomerProductDetails= async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await executeAsync.call(request, 'GetCustomerProductDetails');

        console.log(result);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving orders.');
    }
};

exports.getCustomerProductById = async (req, res) => {
    try {
        const ID = req.params.ID;
        const request = new sql.Request();

        request.input('ID', sql.Int, ID);
        const result = await executeAsync.call(request, 'GetCustomerProductById');

        console.log(result);
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).send('Order not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving order.');
    }
};

exports.getProductsByCustomer = async (req, res) => {
    try {
        const { CustomerCode } = req.params;
        const request = new sql.Request();

        request.input('CustomerCode', sql.VarChar(10), CustomerCode);
        const result = await executeAsync.call(request, 'GetProductsByCustomer');

        console.log(result);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving orders by customer.');
    }
};


exports.deleteCustomerProduct= async (req, res) => {
    try {
        const { ID } = req.params;
        const request = new sql.Request();

        request.input('ID', sql.Int, ID);
        const result = await executeAsync.call(request, 'DeleteCustomerProduct');

        console.log(result);
        res.status(200).send('Order deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting order.');
    }
};

exports.updateCustomerProduct = async (req, res) => {
    try {
        const { ID } = req.params;
        const {
            CustomerCode,
            ProductCode,
            Quantity,
            UnitPrice,
            TotalAmount
        } = req.body;

        const request = new sql.Request();

        request.input('ID', sql.Int, ID);
        request.input('CustomerCode', sql.VarChar(10), CustomerCode);
        request.input('ProductCode', sql.VarChar(20), ProductCode);
        request.input('Quantity', sql.Int, Quantity);
        request.input('UnitPrice', sql.Decimal(10, 2), UnitPrice);
        request.input('TotalAmount', sql.Decimal(10, 2), TotalAmount);

        const result = await executeAsync.call(request, 'UpdateCustomerProduct');

        console.log(result);
        res.status(200).send('Order updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating order.');
    }
};
