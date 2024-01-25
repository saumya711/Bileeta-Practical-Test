import axios from 'axios';

export const getCustomerProductDetails = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/customer-products`);
};

export const getProductsByCustomer = async (CustomerCode) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/product-by-customer/${CustomerCode}`);
};

export const createProductDetail = async (cutomerProductData) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/customer-product`,
    cutomerProductData
  );
};

export const deleteCustomerProduct = async (ID) => {
  return await axios.delete(`${process.env.REACT_APP_API}/customer-product/${ID}`);
};

export const getCustomerProductById = async (ID) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/customer-product/${ID}`);
};

export const updateCustomerProduct = async (ID, cutomerProductData) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/customer-product/${ID}`, 
    cutomerProductData
  );
};


