const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', async (err, db) => {
    if (err) {
        return console.log("Unable To Connec to Mongo");
    }
    // db.collection('Users').findOneAndUpdate(
    //     {
    //         _id: new ObjectID('5b6174222948432fa89fb498')
    //     },
    //     {
    //         $set: {
    //             name: 'Najam',
    //             text:"Workout"
    //         }
    //     }, 
    //     {
    //         returnOriginal:false
    //     }

    // )
    //     .then(result => {
    //         console.log(result);
    //     });
    // db.collection('Users').findOneAndUpdate(
    //     {
    //         _id: new ObjectID('5b61d7ec5b79531bd44714e7')
    //     },
    //     {
    //         $set: {
    //             name: 'Najam Shehzad',
    //         },
    //         $inc: {
    //             age: 1
    //         }
    //     },
    //     {
    //         returnOriginal: false
    //     }

    // )
    //     .then(result => {
    //         console.log(result);
    //     });
    // console.log('hi');

    //to push something in database like firebase
    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectID('5b61d7ec5b79531bd44714e7')
        },
        {
            $push: {
                favoriteList:{
                    addid:"54845132"
                }
            }
        },
        {
            returnOriginal: false
        }

    )
        .then(result => {
            console.log(JSON.stringify(result,undefined,2));
        });

    db.close();
})