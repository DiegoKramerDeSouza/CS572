const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
require('dotenv').config();

const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PWD + '@' + process.env.DB_HOST + '/test?retryWrites=true';
const client = new MongoClient(uri, {useNewUrlParser: true});

let db;
app.use((req, res, next) => {
	if(!db){
		client.connect(err => {
			if(!err){
				db = client.db('homework08');
				res.db = db;
				return next();
			}
			res.end('Connection fail!');
		})
	} else {
		res.db = db;
		next();
	}
});
app.get('/restaurants/list', (req, res) => {
	res.db.collection('restaurants').find().toArray((err, doc) =>{
		res.json(doc);
	});
});

app.listen(3000, _ => console.log('Started at 3000'));