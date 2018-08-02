const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/db/models/Todo');
const { Users } = require('../server/db/models/User');

var id = '5b6272ac5fd850e839a47d2e';

// Todo.find({
//     _id:id
// }).then((todos)=> {
//     console.log('Todos',todos);
// },err => {
//     console.log(err);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=> {
//     if(!todo){
//         return console.log('Id Not Found')
//     }
//     console.log('Todo ',todo);
// },err => {
//     console.log(err);
// });

// Todo.findById(id).then((todo)=> {
//     console.log('Todo By Id ',todo);
// },err => {
//     console.log(err);
// });
Users.findById(id).then((user) => {
    if (!user) {
        return console.log('User Not Found')
    }
    console.log('User info : ', user);
}, err => {
    console.log("Unable to find user :", err)
})
