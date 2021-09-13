import axios from 'axios';

export default axios.create({
  // baseURL: 'https://learningportal.ocsc.go.th/todoapi/',
  baseURL: 'https://localhost:5001/todoapi/',
});
