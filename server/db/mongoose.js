var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.databaseUri||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
