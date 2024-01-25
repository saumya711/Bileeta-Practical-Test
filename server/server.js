const express = require('express');
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const bodyParser = require('body-parser');
var config = require('./dbconfig');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// routes
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productsRoutes = require('./routes/products');
const customerProductsRoutes = require('./routes/customerProductRoutes');

sql.connect(config,function(err){
    if(err) {
        console.log(err);
    }
    var request = new sql.Request();
    request.query("select * from customers",function(err, records){
        if(err) {
            console.log(err);
        } else {
            console.log(records);
        }
    })
});

// Use the orders routes
app.use('/api', orderRoutes);
app.use('/api', customerRoutes);
app.use('/api', productsRoutes);
app.use('/api', customerProductsRoutes);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
