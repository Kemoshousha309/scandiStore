const { default: axios } = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:4000/",
    timeout: 1000,
    method: "POST"
  });

export default instance;