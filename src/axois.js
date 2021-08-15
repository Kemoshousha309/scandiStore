const { default: axios } = require("axios");

const instance = axios.create({
  // stablish my graphql on my local host
    baseURL: "http://localhost:4000/",
    timeout: 1000,
    method: "POST"
});

export default instance;