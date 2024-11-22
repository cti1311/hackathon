const axios = require("axios");
const config = require("../config");
const logger = require("../utils/logger");

const OpenAI = require("openai");
const openai = new OpenAI({apiKey: config.openai.apiKey});

class ChatGPTService {
  async generateText(prompt) {
    logger.info(`Generating text with ChatGPT for prompt: "${prompt}"`);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": `
                  You are an assistant that creats a confluence page with user input as the content, you will need to summarize the content and provide detailed techical specs. The output must be formatted in html without any html, head or body tags.
                `
              }
            ]
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": prompt
              }
            ]
          }
        ],
      });
      // console.log(JSON.stringify(completion))
      // console.log(completion.choices[0].message);
      logger.info(
        `Successfully generated text with ChatGPT for prompt: "${prompt}"`
      );
      return completion.choices[0].message.content;
    } catch (error) {
      logger.error(`Error generating text with ChatGPT: ${error.message}`);
      throw error;
    }
  }

  async generateTextFromCode(prompt) {
    logger.info(`Generating text from code with ChatGPT for prompt: "${prompt}"`);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": `Write a confluence page for the code provided by the user. The output must be formatted in html without any html, head or body tags.`
              }
            ]
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": prompt
              }
            ]
          }
        ],
      });
      // console.log(JSON.stringify(completion))
      // console.log(completion.choices[0].message);
      logger.info(
        `Successfully generated text with ChatGPT for prompt: "${prompt}"`
      );
      return completion.choices[0].message.content;
    } catch (error) {
      logger.error(`Error generating text with ChatGPT: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new ChatGPTService();
