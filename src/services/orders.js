import axios from 'axios';
import BASE_URL from './api';

const placeOrder = data => axios.post(`${BASE_URL}/orders.json`, data);

export default placeOrder;
