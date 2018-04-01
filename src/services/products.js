import axios from 'axios';
import BASE_URL from './api';

export const getAllProducts = () =>
  axios.get(`${BASE_URL}/products.json`)
    .then(({ data }) => {
      localStorage.setItem('products', JSON.stringify(data));
      return data;
    });

export const getAllProductsFromCache = () =>
  new Promise((resolve) => {
    const products = localStorage.getItem('products');
    return resolve(JSON.parse(products));
  });
