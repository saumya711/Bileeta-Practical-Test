import React, { useEffect, useState } from "react";
import { getOrderById, updateOrder } from "../functions/order"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const initialState = {
  CustomerCode: "",
  SubTotal: "",
  DiscountTotal: "",
  NetTotal: "",
};

const UpdateOrder = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const { CustomerCode, SubTotal, DiscountTotal, NetTotal } = values;

  const navigate = useNavigate();

  let { OrderID } = useParams();

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder= async () => {
    setLoading(true);
    getOrderById(OrderID)
      .then((res) => {
        setValues({ ...values, ...res.data });
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = { ...values, [name]: value };
  
    if (name === "DiscountTotal") {
      const newNetTotal = SubTotal - parseFloat(value || 0);
      newValue.NetTotal = newNetTotal.toFixed(2);
    }
  
    setValues(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrder(OrderID, values)
      .then((res) => {
        console.log(res);
        toast.success("Order Updated Successfully");
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="amount-form">
      <label>Customer Code:</label>
        <input
          disabled
          type="text"
          id="CustomerCode"
          name="CustomerCode"
          value={CustomerCode}
        />
        <label>Sub Total:</label>
        <input
          disabled
          type="text"
          id="SubTotal"
          name="SubTotal"
          value={SubTotal}
        />

        <label>Discount Total:</label>
        <input
          type="text"
          id="DiscountTotal"
          name="DiscountTotal"
          value={DiscountTotal}
          onChange={handleInputChange}
        />

        <label>Net Total:</label>
        <input
          type="text"
          id="NetTotal"
          name="NetTotal"
          value={NetTotal}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="add-order-button">
        Save
      </button>
      <Link to="/">
        <button className="close-order-button">Close</button>
      </Link>
    </form>
  );
};

export default UpdateOrder;
