const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable To Connect to MongoDb');
    }
    console.log("Sucsessfully Connected to MongoDb");


    // db.collection('Todos').find({complete:true}).toArray()
    //     .then((docs) => {
    //         console.log("Todos : \n",JSON.stringify(docs,undefined,2));

    //     }, (err) => {
    //         console.log("Unable To Fetch ", err);
    //     });

    // console.log()
    //Specific field
    db.collection('Users').find({_id:new ObjectID('5b61d7ec5b79531bd44714e7')},{"favoriteList":1,_id:0}).toArray()
        .then((docs) => {
            console.log("Users : \n",JSON.stringify(docs[0].favoriteList,undefined,2));

        }, (err) => {
            console.log("Unable To Fetch ", err);
        });

    console.log()

    // db.close();
});