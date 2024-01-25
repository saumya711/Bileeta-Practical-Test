import React from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomerProductList = ({ allOorder, hanldeDelete }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Code</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Amount</th>
            <th className="last-header">Actions</th>
          </tr>
        </thead>
        {allOorder.length ? (
          <tbody>
            {allOorder.map((order, index) => (
              <tr key={order.ID} className={"order"}>
                <td>{order.ID}</td>
                <td>{order.ProductCode}</td>
                <td>{order.Quantity}</td>
                <td>{order.UnitPrice}</td>
                <td>{order.TotalAmount}</td>
                <td>Total</td>
                <td>
                  <div className="order-icons">
                    <Link to={`/update-customer-product/${order.ID}`}>
                      <FaEdit
                        color="purple"
                      />
                    </Link>
                    
                    <FaRegTrashAlt
                      color="red"
                      onClick={() => hanldeDelete(order.ID)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>This Customer has not any order</p>
        )}
      </table>
    </div>
  );
};

export default CustomerProductList;
