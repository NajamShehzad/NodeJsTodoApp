const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',async (err,db) => {
    if(err){
        return console.log("Unable To Connec to Mongo");
    }
    //DELETE MANY
    // var result = await db.collection('Users').deleteMany({name:'Najam'});
    // console.log(result);

    //DELETE ONE
    // db.collection('Todos').deleteOne({text:'Talk To Teacher'})
    // .then(result => {
    //     console.log(result);
    // });

    //FINDONE AND DELETE TARGETTED
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b61bb291cba2723a87dab8d')})
    .then(result => {
        console.log(result);
    });

    // console.log('hi');

    db.close();
})