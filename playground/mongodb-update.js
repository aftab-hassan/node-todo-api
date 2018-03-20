const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoAppDb', (err, client) => {
    if(err)
    {
        return console.log('Unable to connect to db server')
    }
    console.log('Connected to mongo db server')

    const db = client.db('TodoAppDb');

    // findOneAndUpdate(filter, update, options, callback)
    // http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({_id : new ObjectID("5ab09414b7c946203dd95c7a")}, {
        $set : {
            completed:true
        }
    }, {
        returnOriginal:false
    }).then( (results) => {
        console.log(results);
    })

    // Challenge
    db.collection('Users').findOneAndUpdate({_id : new ObjectID("5aaf4e5f6391881c84e21fbd")}, {
        $set : {
            name:'Aftab Hassan'
        },
        $inc : {
            age:1
        }
    }, {
        returnOriginal:false
    }).then( (results) => {
        console.log(results);
    })

    client.close();
})