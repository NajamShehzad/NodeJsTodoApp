var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = "mongodb://mydatabase:lai9024lv@ds139082.mlab.com:39082/mydatabase";

mongoose.connect(uri);

module.exports = {mongoose};
