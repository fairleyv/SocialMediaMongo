const {connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialDB';

connect(connectionString);

module.exports = connection;