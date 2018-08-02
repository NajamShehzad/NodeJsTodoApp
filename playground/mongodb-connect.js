const MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://mydatabase:lai9024lv@ds139082.mlab.com:39082/mydatabase";
var uri2 = "mongodb+srv://database:lai9024lv@olxpakistan-xftkm.mongodb.net/test?retryWrites=true"

MongoClient.connect(uri, (err, db) => {
    if (err) {
        return console.log('Unable To Connect to MongoDb');
    }
    console.log("Sucsessfully Connected to MongoDb");

    // db.collection('Todos').insertOne({
    //     text: 'Talk To Teacher',
    //     complete: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Something Went Wrong");
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
        
    // })
    db.collection('Users').insertOne({
        name:'Najam Shehzad Butt',
        age:22,
        location:'UK'
    },(err,result) => {
        if(err){
           return console.log('Something Went Wrong');
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    db.close();
});