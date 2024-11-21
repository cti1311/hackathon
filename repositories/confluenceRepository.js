const createAxiosInstance = require('../utils/axiosInstance');
const { confluence } = require('../config');

const axiosInstance = createAxiosInstance(confluence.baseUrl, {
  Authorization: `Basic ${Buffer.from(`${confluence.userEmail}:${confluence.apiKey}`).toString('base64')}`,
  'Content-Type': 'application/json',
});

class ConfluenceRepository {
  async getPageContentById(pageId) {
    try {
      const response = await axiosInstance.get(`/rest/api/content/${pageId}`, {
        params: {
          expand: 'body.storage', // Fetch the content in "storage" format
        },
      });
      return response.data.body.storage.value;
    } catch (error) {
      throw new Error(`Failed to fetch page with ID ${pageId}: ${error.response?.data?.message || error.message}`);
    }
  }

  async createPage(spaceKey, title, body) {
    const payload = {
      type: 'page',
      title,
      space: { key: spaceKey },
      body: {
        storage: {
          value: body,
          representation: 'storage',
        },
      },
    };
    let response;
    try {
        response = await axiosInstance.post('/rest/api/content', payload);
      } catch (error) {
        throw new Error(`Failed to create page: ${error.response?.data?.message || error.message}`);
      }
    return response.data;
  }
}

module.exports = new ConfluenceRepository();
