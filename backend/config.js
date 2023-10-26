const fs = require('fs');

const configPath = './config.json';
const configData = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configData);

module.exports = config;