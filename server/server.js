const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send()
    }

    Todo.findById(id).then( (todo) => {
        if (!todo) {
            return res.status(404).send();
        }

      res.send({todo})
    }).catch((e) => {
      res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log("id == "+id);

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findByIdAndRemove(id)
        .then( (todo) => {
            if(!todo)
                return res.status(404).send();
            else
                res.send({todo})
        }).catch( (e) => {
            res.status(400).send()
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed'])

    if(!ObjectID.isValid(id))
        return res.status(404).send()

    if(_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime();
    else
    {
        // needed since we're setting the body to body in $set
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new:true})
        .then( (updatedGoal) => {
            if(!updatedGoal)
                return res.status(404).send()
            res.send({updatedGoal})
        })
        .catch( (e) => {
            console.log(e)
            res.status(400).send();
        })
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
