import axios from 'axios';

export const createOrder = async (orderData) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/order`,
      orderData
    );
  };

  export const getOrders = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/orders`);
};

export const deleteOrder = async (OrderID) => {
  return await axios.delete(`${process.env.REACT_APP_API}/order/${OrderID}`);
};

export const getOrderById = async (OrderID) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/order/${OrderID}`);
};
  