const express = require('express');
const ConfluenceController = require('../controllers/confluenceController');
const ChatGPTController = require('../controllers/chatGPTController');

const router = express.Router();

router.get('/getContentFromConfluence/:pageId', ConfluenceController.getPageById);
router.post('/createConfluencePage', ConfluenceController.createPage);
router.post('/chatgpt/create-confluence-page', ChatGPTController.generateAndCreatePage);
router.post('/chatgpt/create-confluence-page-using-code', ChatGPTController.generateAndCreatePageUsingCode);

module.exports = router;