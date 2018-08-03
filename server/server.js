const express = require('express');
const _ = require('lodash');
const { SHA256 } = require('crypto-js');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./db/models/Todo');
const jwt = require('jsonwebtoken');
var { Users } = require('./db/models/User');
var { authenticate } = require('./middleware/authenticate');
var app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());


//For Todos
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

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid id');
    }

    Todo.findByIdAndRemove(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send("id not found")
            }
            res.send({ todo });
        }, err => {
            res.status(400).send("id not found")
        });

});
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid id');
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }
    console.log(body);
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }, err => {
        res.status(404).send();
    })

});
//NOW For Users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new Users(body);
    console.log('im here')
    body.password = SHA256(JSON.stringify(body.password) + '@#someword').toString();

    console.log(body);

    user.save().then(result => {
        if (!result) {
            return res.status(404).send('Some Went wrong')
        }
        //now pushing token in user body
        var access = 'auth';
        var token = jwt.sign({ _id: result._id.toHexString(), access }, 'abc123').toString();
        body.tokens = [];
        body.tokens.push({ access, token });
        body._id = result._id
        //updating user body
        Users.findByIdAndUpdate(body._id, { $set: body }, { new: true }).then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            var dataToSend = _.pick(result, ['email', '_id']);
            res.header('x-auth', token).send(dataToSend);
        }, err => {
            res.status(404).send();
        })
    }).catch(err => {
        res.status(404).send(err);
    })
});
app.get('/users/me', authenticate, (req, res) => {
    console.log('working');
    res.send(req.user);
    // res.send('hi there')
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    // console.log(body);
    Users.findOne({ email: body.email }).then(result => {
        if (!result) {
            return res.status(401).send();
        }
        var reqPass = SHA256(JSON.stringify(body.password) + '@#someword').toString();
        var userPass = result.password;
        if (reqPass !== userPass) {
            console.log("Something is Wrong");
            return res.status(401).send();
        }
        var access = 'auth';
        var token = jwt.sign({ _id: result._id.toHexString(), access }, 'abc123').toString();
        body = result
        body.tokens.push({ access, token });
        
        // updating user body
        Users.findByIdAndUpdate(body._id, { $set: body }, { new: true }).then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            res.header('x-auth', token).send(result);
        }, err => {
            res.status(404).send();
        });
    }).catch(err => {
        res.status(401).send(err);

    });
});





app.listen(port, () => {
    console.log(`Listing Port ${port}`);
})