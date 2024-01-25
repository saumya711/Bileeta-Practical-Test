import axios from 'axios';

export const getCustomers = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/customers`);
};