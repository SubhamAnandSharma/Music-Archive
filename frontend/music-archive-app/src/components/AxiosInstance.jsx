import axios from 'axios';

const baseURL = 'http://localhost:8080/';  // Replace with your actual base URL

const axiosInstance = axios.create({
  baseURL,
  // You can add more custom configurations here, such as headers, timeouts, etc.
});

export default axiosInstance;
