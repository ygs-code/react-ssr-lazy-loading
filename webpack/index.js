const webpack = require('webpack');
const client = require('./config/client');
const server = require('./config/server');

module.exports = {
    compiler: () => webpack([client, server]),
    config: [client, server],
};
