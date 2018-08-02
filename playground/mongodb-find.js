const {MongoClient,ObjectID} = require('mongodb');
var uri = "mongodb://mydatabase:lai9024lv@ds139082.mlab.com:39082/mydatabase";

MongoClient.connect(uri, (err, db) => {
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
    // db.collection('Users').find({_id:new ObjectID('5b61d7ec5b79531bd44714e7')},{"favoriteList":1,_id:0}).toArray()
    //     .then((docs) => {
    //         console.log("Users : \n",JSON.stringify(docs[0].favoriteList,undefined,2));

    //     }, (err) => {
    //         console.log("Unable To Fetch ", err);
    //     });

    // console.log()

    db.collection('Users').find({_id:ObjectID('5b62f1537103e24088f1a32d')}).toArray()
    .then((docs) => {
        console.log("Users : \n",JSON.stringify(docs,undefined,2));

    }, (err) => {
        console.log("Unable To Fetch ", err);
    });



     db.close();
});