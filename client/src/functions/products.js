import axios from 'axios';

export const getProducts = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/products`);
};