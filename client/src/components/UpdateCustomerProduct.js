import React, { useEffect, useState } from "react";
import { getCustomers } from "../functions/cutomer";
import { updateCustomerProduct, getCustomerProductById } from "../functions/customerProducts";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const initialState = {
  CustomerCode: "",
  ProductCode: "",
  Quantity: "",
  UnitPrice: "",
  TotalAmount: "",
};

const UpdateCustomerProduct = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const { CustomerCode, ProductCode, Quantity, UnitPrice, TotalAmount } = values;

  let { ID } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    getAllCustomers();
    getCustomerProduct();
  }, []);

  const getCustomerProduct= async () => {
    setLoading(true);
    getCustomerProductById(ID)
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
    updateCustomerProduct(ID, values)
      .then((res) => {
        console.log(res);
        toast.success("CUstomer Product Updated Successfully");
        navigate('/add-order');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="CustomerCode">Customer Name:</label>
        <select
          name="CustomerCode"
          onChange={handleInputChange}
          value={CustomerCode}
        >
          <option>Selelect Customer</option>
          {customers.map((customer) => (
            <option value={customer.CustomerCode}>
              {customer.CustomerName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="ProductCode">Product Code:</label>
        <input
          type="text"
          id="ProductCode"
          placeholder="Add Product Code"
          name="ProductCode"
          value={ProductCode}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Quantity">Quantity:</label>
        <input
          type="text"
          id="Quantity"
          placeholder="Add Quantity"
          name="Quantity"
          value={Quantity}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="UnitPrice">Unit Price:</label>
        <input
          type="text"
          id="UnitPrice"
          placeholder="Add Price of Unit"
          name="UnitPrice"
          value={UnitPrice}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="TotalAmount">Total Amount:</label>
        <input
          type="text"
          id="TotalAmount"
          name="TotalAmount"
          value={TotalAmount}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="add-order-button">
        Edit
      </button>
      <Link to="/add-order">
        <button className="close-order-button">Close</button>
      </Link>
    </form>
  );
};

export default UpdateCustomerProduct;
