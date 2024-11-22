const confluenceService = require('../services/confluenceService');
const logger = require('../utils/logger');

class ConfluenceController {

  // Function to get conflunce page content by id
  async getPageById(req, res) {
    const { pageId } = req.params;
    logger.info(`Received request to fetch Confluence page with ID: ${pageId}`);
    try {
      const pageContent = await confluenceService.fetchPage(pageId);
      logger.info(`Successfully handled request for page ID: ${pageId}`);
      res.json({status: true, ...pageContent});
    } catch (error) {
      logger.error(`Failed to fetch Confluence page ${pageId}: ${error.message}`);
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // Test API to create confluence PAGE
  async createPage(req, res) {
    logger.info(JSON.stringify(req.body))
    const { content, spaceKey, title } = req.body;
    logger.info(`Received request to create Confluence page. Space: ${spaceKey}, Title: ${title}`);
    try {
      const newPage = await confluenceService.createConfluencePage(spaceKey, title, content);
      logger.info(`Successfully created Confluence page: ${title}`);
      res.json(newPage);
    } catch (error) {
      logger.error(`Failed to create Confluence page: ${error.message}`);
      res.status(500).json({status: false, error: error.message });
    }
  }
}

module.exports = new ConfluenceController();
