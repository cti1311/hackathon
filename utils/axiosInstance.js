const axios = require('axios');

const createAxiosInstance = (baseURL, headers) => {
  return axios.create({
    baseURL,
    headers,
  });
};

module.exports = createAxiosInstance;
