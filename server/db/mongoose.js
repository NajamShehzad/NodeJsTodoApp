var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// var uri ;
// uri = "mongodb://mydatabase:lai9024lv@ds139082.mlab.com:39082/mydatabase";

mongoose.connect(process.env.databaseUri||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
