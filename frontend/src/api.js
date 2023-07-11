import axios from 'axios';

const getCustomerDetail = (id) =>
  axios.get(`http://localhost:3001/customers/${id}`);

const getPaginatedCustomers = (currentPage) =>
  axios.get(`http://localhost:3001/customers?page=${currentPage}`);

export default { getCustomerDetail, getPaginatedCustomers };
