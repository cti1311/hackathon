const chatgptService = require('../services/chatGPTService');
const confluenceService = require('../services/confluenceService');
const logger = require('../utils/logger');

class ChatGPTController {

// Function to 
  async generateAndCreatePage(req, res) {
    const { prompt, spaceKey, title } = req.body;
    logger.info(`Received request to generate ChatGPT output and create Confluence page. Space: ${spaceKey}, Title: ${title}`);
    try {
      const generatedText = await chatgptService.generateText(prompt);
      logger.info(`ChatGPT output generated successfully for prompt: "${prompt}"`);
    //   logger.info(`gpt output: ${generatedText}`)
      const newPage = await confluenceService.createConfluencePage(spaceKey, title, generatedText);
      logger.info(`Successfully created Confluence page: ${title}`);
      res.json(newPage);
    } catch (error) {
      logger.error(`Failed to create Confluence page: ${error.message}`);
      res.status(500).json({status: false, error: error.message });
    }
  }

  async generateAndCreatePageUsingCode(req, res) {
    const { prompt, spaceKey, title } = req.body;
    logger.info(`Received request to generate ChatGPT output and create Confluence page. Space: ${spaceKey}, Title: ${title}, Prompt: ${prompt}`);
    try {
      const generatedText = await chatgptService.generateTextFromCode(prompt);
      logger.info(`ChatGPT output generated successfully for prompt: "${prompt}"`);
    //   logger.info(`gpt output: ${generatedText}`)
      const newPage = await confluenceService.createConfluencePage(spaceKey, title, generatedText);
      logger.info(`Successfully created Confluence page: ${title}`);
      res.json(newPage);
    } catch (error) {
      logger.error(`Failed to create Confluence page: ${error.message}`);
      res.status(500).json({status: false, error: error.message });
    }
  }
}

module.exports = new ChatGPTController();
