require('dotenv').config();

module.exports = {
  confluence: {
    baseUrl: process.env.CONFLUENCE_BASE_URL,
    apiKey: process.env.CONFLUENCE_API_KEY,
    userEmail: process.env.CONFLUENCE_USER_EMAIL,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  server: {
    port: process.env.PORT || 3000,
  },
};