import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Orders from "./pages/Orders";
import AddCustomerProduct from "./components/AddCustomerProduct";
import UpdateCustomerProduct from "./components/UpdateCustomerProduct";
import AddOrder from "./components/AddOrder";

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <div className="app">
        <div className="order-container">
          <Router>
            <Routes>
              <Route exact path="/" element={<Orders />} />
              <Route exact path="/add-order" element={<AddOrder />} />
              <Route exact path="/add-customer-product" element={<AddCustomerProduct />} />
              <Route exact path="/update-customer-product/:ID" element={<UpdateCustomerProduct />} />
            </Routes>
          </Router>
          
        </div>
      </div>
    </>
  );
}

export default App;
