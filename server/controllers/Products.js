const sql = require('mssql/msnodesqlv8');
var config = require('../dbconfig');

exports.getProducts = async (req, res) => {
    const request = new sql.Request();

    request.execute('GetProducts', function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving orders.');
        } else {
            console.log(result);
            res.status(200).json(result.recordset);
        }
    });
};