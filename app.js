const express = require('express');
const routes = require('./routes');
const { server } = require('./config');
const logger = require('./utils/logger');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(server.port, () => {
  logger.info(`Server is running on port ${server.port}`);
});

// Uncaught Exception and promise rejection handling
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});
