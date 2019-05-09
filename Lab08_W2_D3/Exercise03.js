const express = require('express');
const {MongoClient} = require('mongodb');
const parserJson = express.json();
const app = express();
require('dotenv').config();

const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PWD + '@' + process.env.DB_HOST + '/test?retryWrites=true';
const client = new MongoClient(uri, {useNewUrlParser: true});

let myLocation = [-91.9665342, 41.017654];
let db;

app.use((req, res, next) => {
	if(!db){
		client.connect(err => {
			if(err) throw err;
			db = client.db('homework08');
			db.collection('locations').createIndex({coord: '2d', category: 1, name: 1}, {background: true});
			res.db = db;
			return next();
		})
	} else {
		res.db = db;
		next();
	}
});
app.post('/add', parserJson, (req, res, next) => {
	if(req.body.length){
		res.db.collection('locations').insertMany(req.body, (err, data) => {
			if(err) throw err;
			res.send('Locations registred successfully!');
		});
	} else res.end('Location data missing!');
})
app.get('/find/:category?/:name?', (req, res) => {
	if(!req.params.category) {
		res.end('Category not especified.');
		return;
	}
	let query = req.params.name ? 
				{coord: {$near: myLocation}, category: req.params.category, name: req.params.name} :
				{coord: {$near: myLocation}, category: req.params.category};
	res.db.collection('locations')
		.find(query)
		.limit(3)
		.project({_id: 0})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// Remove all documents
app.get('/remove', parserJson, (req, res) => {
	res.db.collection('locations').remove({}, (err, removed) => {
		if(err) throw err;
		res.send(removed + ' locations removed.');
	});
})

app.listen(3000, _ => console.log('Started at 3000'));