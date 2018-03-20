const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoAppDb', (err, client) => {
    if(err)
    {
        return console.log('Unable to connect to db server')
    }
    console.log('Connected to mongo db server')

    const db = client.db('TodoAppDb');

    //delete many
    // db.collection('Todos').deleteMany({goal:'delete this goal'}).then( (result) => {
    //     console.log(result);
    // })

    //delete one
    // db.collection('Todos').deleteOne({goal:'delete this goal'}).then( (result) => {
    //     console.log(result);
    // })

    //find one and delete
    //gets the document back as well as delete it
    /*
    Output looks like
    { lastErrorObject: { n: 1 },
  value:
   { _id: 5aaf5592b7c946203dd95467,
     goal: 'Workout',
     completed: false },
  ok: 1 }
     */
    // So basically, you could display back to the user saying that this was deleted
    // db.collection('Todos').findOneAndDelete({completed:false}).then( (result) => {
    //     console.log(result);
    // })

    // Challenge 1
    db.collection('Users').deleteMany({name:'Andrew'}).then( (result) => {
        console.log(result);
    })

    // Challenge 2
    db.collection('Users').findOneAndDelete({_id : new ObjectId("5aaf5578b7c946203dd95464")}).then( (result) => {
        console.log(result);
    })

    client.close();
})
