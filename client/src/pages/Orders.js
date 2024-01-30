import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOrder, getOrders } from "../functions/order";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Orders = () => {
  const [allOorder, setAllOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    setLoading(true);
    getOrders().then((res) => {
      setAllOrder(res.data);
      setLoading(false);
    });
  };

  const hanldeDelete = async (OrderID) => {
    if (window.confirm("Are you sure delete this order?")) {
      setLoading(true);
      deleteOrder(OrderID)
        .then((res) => {
          setLoading(false);
          toast.error("Customer Product Deleted");
          getAllOrders();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div>
      <h2>Customer Order</h2>
      <hr />

      <div>

        <div>
          <Link to="/add-order">
            <button className="add-button">Create New Order</button>
          </Link>
        </div>

        <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Code</th>
            <th>Sub Total</th>
            <th>Discount Total</th>
            <th>Net TotalAmount</th>
            <th className="last-header">Actions</th>
          </tr>
        </thead>
        {allOorder.length ? (
          <tbody>
            {allOorder.map((order, index) => (
              <tr key={order.OrderID} className={"order"}>
                <td>{order.OrderID}</td>
                <td>{order.CustomerCode}</td>
                <td>{order.SubTotal}</td>
                <td>{order.DiscountTotal}</td>
                <td>{order.NetTotal}</td>
                <td>
                  <div className="order-icons">
                    <Link to={`/update-order/${order.OrderID}`}>
                      <FaEdit
                        color="purple"
                      />
                    </Link>
                    
                    <FaRegTrashAlt
                      color="red"
                      onClick={() => hanldeDelete(order.OrderID)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>No any order</p>
        )}
      </table>
      </div>
    </div>
  );
};

export default Orders;
