import React, { useEffect, useState } from "react";
import {
  getCustomerProductDetails,
  deleteCustomerProduct,
  getProductsByCustomer,
} from "./../functions/customerProducts";
import { getCustomers } from "../functions/cutomer";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import CustomerProductList from "./CustomerProductList";
import { createOrder } from "../functions/order";

const initialState = {
  CustomerCode: "",
  SubTotal: "",
  DiscountTotal: "",
  NetTotal: "",
}

const AddOrder = () => {
  const [ values, setValues ] = useState(initialState);
  const [allOorder, setAllOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const { CustomerCode, SubTotal, DiscountTotal, NetTotal } = values;

  const navigate = useNavigate();

  useEffect(() => {
    loadAllCstomerProducts();
    getAllCustomers();
  }, [selectedCustomer]);

  const loadAllCstomerProducts = () => {
    setLoading(true);
    if (selectedCustomer) {
      // If a customer is selected, fetch orders for that customer
      getProductsByCustomer(selectedCustomer)
        .then((res) => {
          setAllOrder(res.data);
          calculateTotals(res.data);
          console.log("orders", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } 
  };

  const getAllCustomers = () => {
    setLoading(true);
    getCustomers().then((res) => {
      setCustomers(res.data);
      console.log("customers", res.data);
      setLoading(false);
    });
  };

  const calculateTotals = (orders) => {
      const subTotal = orders.reduce((acc, order) => acc + order.TotalAmount, 0);
      setValues({
        ...values,
        SubTotal: subTotal.toFixed(2),
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

  const handleCustomerChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCustomer(selectedValue);
    setValues({
    ...values,
    CustomerCode: selectedValue,
  });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked Order Save", CustomerCode,"select customer", selectedCustomer);
    createOrder(values)
      .then((res) => {
        console.log("order data",res);
        toast.success("Order Created Successfully");
        setValues(initialState);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      })
  };

  const hanldeDelete = async (ID) => {
    if (window.confirm("Are you sure delete this order?")) {
      setLoading(true);
      deleteCustomerProduct(ID)
        .then((res) => {
          setLoading(false);
          toast.error("Customer Product Deleted");
          loadAllCstomerProducts();
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
        <div className="home-page">
          <label>Customer Code:</label>
          <input
            id="CustomerCode"
            name='CustomerCode'
            type="text"
            value={CustomerCode}
          />


          <div style={{ float: "right" }}>
            <label>Customer Name:</label>
            <select
              onChange={handleCustomerChange}
              value={selectedCustomer}
            >
              <option value="">All</option>
              {customers.map((customer) => (
                <option
                  key={customer.CustomerCode}
                  value={customer.CustomerCode}
                >
                  {customer.CustomerName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Link to="/add-customer-product">
            <button className="add-button">Add Product to Customer</button>
          </Link>
        </div>

        <div style={{ marginTop: "10px" }}>
          <CustomerProductList
            allOorder={allOorder}
            hanldeDelete={hanldeDelete}
          />
        </div>

        {selectedCustomer && (
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
        )}
      </div>
      <button type="submit" className="add-order-button" onClick={handleSubmit}>
        Save
      </button>
      <Link to='/'>
        <button className="close-order-button">Close</button>
      </Link>
    </div>
  );
};

export default AddOrder;
