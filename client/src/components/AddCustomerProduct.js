import React, { useEffect, useState } from "react";
import { getCustomers } from "../functions/cutomer";
import { getProducts } from "../functions/products";
import { createProductDetail } from "../functions/customerProducts"
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  CustomerCode: "",
  ProductCode: "",
  Quantity: "",
  UnitPrice: "",
  TotalAmount: ""
}

const AddCustomerProduct = () => {
  const [ values, setValues ] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const { CustomerCode, ProductCode, Quantity, UnitPrice, TotalAmount } = values;

  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers();
    getAllProducts();
  }, []);

  const getAllCustomers = () => {
    setLoading(true);
    getCustomers().then((res) => {
      setCustomers(res.data);
      console.log("customers", res.data);
      setLoading(false);
    });
  };

  const getAllProducts = () => {
    setLoading(true);
    getProducts().then((res) => {
      setProducts(res.data);
      console.log("products", res.data);
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
        navigate('/add-order');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      })
  }; 

  return (
    <form
      className="order-form"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="CustomerCode">Customer Name:</label>
        <select
          name='CustomerCode'
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
        <select
          name='ProductCode'
          onChange={handleInputChange}
          value={ProductCode}
        >
          <option>Selelect Product</option>
          {products.map((product) => (
            <option value={product.ProductCode}>
              {product.ProductCode}
            </option>
          ))}
        </select>
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
        Add
      </button>
      <Link to='/add-order'>
        <button className="close-order-button">Close</button>
      </Link>
      
    </form>
  );
};

export default AddCustomerProduct;
