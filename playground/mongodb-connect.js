const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.databaseUri, (err, db) => {
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