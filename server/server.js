const express = require('express');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./db/models/Todo');
var { Users } = require('./db/models/User');
var app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    var body = req.body;
    console.log(body);

    var todo = new Todo({
        text: body.text,
    });
    todo.save().then(doc => {
        console.log("Sucessfull :", doc);
        res.send(doc)
    }, err => {
        console.log("Something Went Wrong :", err);
        res.status(400).send(err);

    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, err => {
        res.send(err);
    })
});


app.listen(8000, () => {
    console.log('Listing Port 8000');
})