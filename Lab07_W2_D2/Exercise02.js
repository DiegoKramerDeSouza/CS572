const express = require('express');
const mongo = require('mongodb');
const app = express();
const parseJson = express.json();
const simple = require('simple-encryptor');

const MongoClient = mongo.MongoClient;
const uri = 'mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01';
const client = new MongoClient(uri, {useNewUrlParser: true});


let db;
let collection;

app.use((req, res, next) => {
    if(!db){
        client.connect(err => {
            if(!err){
                db = client.db('homework01');
                collection = db.collection('data');
                return next();
            }
            res.end('Connection FAIL!');
        });
    } else next();
});

app.get('/secret', (req, res) => {
    let key;
    // With findOne
    collection.findOne({}, (err, data) => {
        key = simple(data.key);
        res.send(key.decrypt(data.message));           
    });
    // With find
    /*
    collection.find()
        .project({key: 1, message: 1})
        .toArray((err, doc) => {
            doc.forEach(data => {
                key = simple(data.key);
                res.send(key.decrypt(data.message));
            });            
        }
    );
    */ 
});
// Secret Message: Welcome to MongoDB week :)

app.listen(3000, _ => console.log('Started at port 3000'));