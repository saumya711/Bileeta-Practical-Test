import React, { useEffect, useState } from "react";
import { getCustomers } from "../functions/cutomer";
import { getProducts } from "../functions/products";
import { createProductDetail } from "../functions/customerProducts";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  CustomerCode: "",
  SubTotal: "",
  DiscountTotal: "",
  NetTotal: "",
};

const UpdateOrderForm = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const { CustomerCode, SubTotal, DiscountTotal, NetTotal } = values;

  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = () => {
    setLoading(true);
    getCustomers().then((res) => {
      setCustomers(res.data);
      console.log("customers", res.data);
      setLoading(false);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = { ...values, [name]: value };

    if (name === "Quantity" || name === "UnitPrice") {
      const newTotalAmount = newValue.Quantity * newValue.UnitPrice;
      newValue.TotalAmount = newTotalAmount.toFixed(2);
    }

    setValues(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProductDetail(values)
      .then((res) => {
        console.log(res);
        toast.success("Order Created Successfully");
        setValues(initialState);
        navigate("/add-order");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="amount-form">
        <label>Sub Total:</label>
        <input
          type="text"
          id="SubTotal"
          name="SubTotal"
          value={SubTotal}
          onChange={handleInputChange}
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
        Add
      </button>
      <Link to="/add-order">
        <button className="close-order-button">Close</button>
      </Link>
    </form>
  );
};

export default UpdateOrderForm;
