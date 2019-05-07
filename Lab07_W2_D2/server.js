const express = require('express');
const mongo = require('mongodb');
const parserJson = express.json();
const app = express();
require('dotenv').config();

const MongoClient = mongo.MongoClient;
const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PWD + '@' + process.env.DB_HOST + '.gcp.mongodb.net/test?retryWrites=true';
const client = new MongoClient(uri, { useNewUrlParser: true });

let db;
let collection;
// Middleware
app.use((req, res, next) => {
	if(!db){
		client.connect(err => {
			db = client.db('homework07');
			collection = db.collection('mycollection');
			next();
		});
	} else next();	
});
// Route add by query
app.post('/add', parserJson, (req, res) => {
	if(req.body.course && req.body.lecture){
		try{
			collection.insertOne({course: req.body.course, lecture: req.body.lecture, date: new Date()});
			res.send('Save successfully!');
		}catch(err){
			res.send(err);
		}
	} else {
		res.end('No data to insert.');
	}
});

// Rout get by lecture
app.post('/search/:q', (req, res, next) => {
	if(!req.params.q) return next('route');
	collection.find({lecture: {$eq : req.params.q}})
		.project({_id: 0})
		.toArray((err, doc) => {
			res.send(doc);
		}
	);
});

// Route get all
app.post('/search', parserJson, (req, res) => {
	collection.find().toArray((err, doc) => {
		res.send(doc);
	});	
});

app.listen(3000, _ => console.log('Started at 3000'));

