const confluenceRepository = require('../repositories/confluenceRepository');
const logger = require('../utils/logger');

class ConfluenceService {
  async fetchPage(pageId) {
    logger.info(`Fetching Confluence page with ID: ${pageId}`);
    try {
      const page = await confluenceRepository.getPageContentById(pageId);
      logger.info(`Successfully fetched Confluence page: ${pageId}`);
      return page;
    } catch (error) {
      logger.error(`Error fetching Confluence page ${pageId}: ${error.message}`);
      throw error;
    }
  }

  async createConfluencePage(spaceKey, title, body) {
    logger.info(`Creating Confluence page in space: ${spaceKey}, title: ${title}, body: ${body}`);
    try {
      const page = await confluenceRepository.createPage(spaceKey, title, body);
      logger.info(`Successfully created Confluence page: ${title}`);
      return page;
    } catch (error) {
      logger.error(`Error creating Confluence page: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new ConfluenceService();
