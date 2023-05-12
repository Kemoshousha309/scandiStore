const { default: axios } = require("axios");

const instance = axios.create({
  // stablish my graphql on my local host
    baseURL: "https://sandi-endpoint.onrender.com/",
    timeout: 1000,
    method: "POST"
});

export default instance;
