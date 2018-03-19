const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoAppDb', (err, client) => {
    if(err)
    {
        return console.log('Unable to connect to db server')
    }
    console.log('Connected to mongo db server')

    const db = client.db('TodoAppDb');

    // All goals
    //toArray returns a promise : other cursors http://mongodb.github.io/node-mongodb-native/3.0/api/Cursor.html
    //Examples here : http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#count
    db.collection('Todos').find().toArray().then((goals) => {
        console.log('Goals')
        console.log(JSON.stringify(goals, undefined, 2));
    }, (err) => {
        console.log('Unable to find Todos', err)
    })

    // Goals that are completed
    db.collection('Todos').find({completed:true}).toArray().then((goals) => {
        console.log('Goals that are completed')
        console.log(JSON.stringify(goals, undefined, 2));
    }, (err) => {
        console.log('Unable to find Todos', err)
    })

    // Goals of a specific id
    db.collection('Todos').find({_id : new ObjectID('5aaf5578b7c946203dd95464')}).toArray().then((goals) => {
        console.log('Goals of a specific id')
        console.log(JSON.stringify(goals, undefined, 2));
    }, (err) => {
        console.log('Unable to find Todos', err)
    })

    // Count
    db.collection('Todos').find({_id : new ObjectID('5aaf5578b7c946203dd95464')}).count().then((count) => {
        console.log('Count goals of a specific id')
        console.log(`count == ${count}`);
    }, (err) => {
        console.log('Unable to find Todos', err)
    })

    // Count from the Users table
    db.collection('Users').find({name : 'Aftab'}).count().then((count) => {
        console.log('Count goals of a specific name')
        console.log(`count == ${count}`);
    }, (err) => {
        console.log('Unable to find Todos', err)
    })

    client.close();
})