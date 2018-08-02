const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/db/models/Todo');
const { Users } = require('../server/db/models/User');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });
Todo.findByIdAndRemove('5b63202c6e17a6282c232fcf').then(todo => console.log(todo))