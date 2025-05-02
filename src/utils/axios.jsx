import axios from 'axios';

const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 5000, // Optional: Set a timeout for requests (in ms)
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN'  // Optional: Add token if needed
  },
});

export default instance;
