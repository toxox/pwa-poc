import axios from 'axios';
import BASE_URL from './api';

const getAllProducts = () => axios.get(`${BASE_URL}/products.json`);

export default getAllProducts;
