const sql = require('mssql/msnodesqlv8');
var config = require('../dbconfig');
const util = require('util');

const executeAsync = util.promisify(sql.Request.prototype.execute);

exports.CreateNewOrder = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send('Invalid request body.');
        }

        const {
            CustomerCode,
            SubTotal,
            DiscountTotal,
            NetTotal
        } = req.body;

        const request = new sql.Request();

        request.input('CustomerCode', sql.VarChar(10), CustomerCode);
        request.input('SubTotal', sql.Decimal(10, 2), SubTotal);
        request.input('DiscountTotal', sql.Decimal(5, 2), DiscountTotal);
        request.input('NetTotal', sql.Decimal(10, 2), NetTotal);

        const result = await executeAsync.call(request, 'CreateOrder');

        console.log(result);
        res.status(200).send('Order added successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting order.');
    }
};


exports.getOrders = async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await executeAsync.call(request, 'GetOrders');

        console.log(result);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving orders.');
    }
};

exports.deleteOrder= async (req, res) => {
    try {
        const { OrderID } = req.params;
        const request = new sql.Request();

        request.input('OrderID', sql.Int, OrderID);
        const result = await executeAsync.call(request, 'DeleteCustomerOrder');

        console.log(result);
        res.status(200).send('Order deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting order.');
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const OrderID = req.params.OrderID;
        const request = new sql.Request();

        request.input('OrderID', sql.Int, OrderID);
        const result = await executeAsync.call(request, 'GetOrderById');

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

exports.updateOrder = async (req, res) => {
    try {
        const { OrderID } = req.params;
        const {
            CustomerCode,
            SubTotal,
            DiscountTotal,
            NetTotal
        } = req.body;

        const request = new sql.Request();

        request.input('OrderID', sql.Int, OrderID);
        request.input('CustomerCode', sql.VarChar(10), CustomerCode);
        request.input('SubTotal', sql.Decimal(10, 2), SubTotal);
        request.input('DiscountTotal', sql.Decimal(5, 2), DiscountTotal);
        request.input('NetTotal', sql.Decimal(10, 2), NetTotal);

        const result = await executeAsync.call(request, 'UpdateCustomerOrder');

        console.log(result);
        res.status(200).send('Order updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating order.');
    }
};

