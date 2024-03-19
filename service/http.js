const axios = require("axios");

class HttpService {
  async get(url, params) {
    try {
      const response = await axios.get(url, { ...params });
      return response;
    } catch (error) {
      console.error("Error occurred while making GET request:", error);
      throw error;
    }
  }
}

module.exports = HttpService;
