const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.staging);

module.exports = connection;