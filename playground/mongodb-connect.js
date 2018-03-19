const {MongoClient, ObjectID} = require('mongodb')

var obj = new ObjectID();
console.log(obj);

var user = {name:'Aftab', age:25}
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoAppDb', (err, client) => {
    if(err)
    {
        return console.log('Unable to connect to db server')
    }
    console.log('Connected to mongo db server')

    const db = client.db('TodoAppDb');

    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed:false
    // }, (err, result) => {
    //     if(err)
    //     {
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //
    // })

    db.collection('Users').insertOne({
        name:'Hassan',
        age:'25',
        location:'Ne Bel-Red'
    }, (err, result) => {
        if(err)
        {
            return console.log('Unable to insert todo', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    })

    client.close();
})