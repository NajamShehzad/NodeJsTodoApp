const express = require('express');
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./db/models/Todo');
var { Users } = require('./db/models/User');
var app = express();

const port = process.env.PORT || 8000;

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
    });
});
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("id is Not Valid");
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send("id Not Found");
        }
        res.send({ todo });
    }, err => {
        res.status(400).send([]);
    });

});
app.delete('/todos/:id', (req, res) => {
    console.log(req.params.id);
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid id');
    }

    Todo.findByIdAndRemove(id)
        .then(todo => {
            if(!todo){
                return res.status(404).send("id not found")
            }
            res.send({ todo });
        },err => {
            res.status(400).send("id not found")
        });

});


app.listen(port, () => {
    console.log(`Listing Port ${port}`);
})