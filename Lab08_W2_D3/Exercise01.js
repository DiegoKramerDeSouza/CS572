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
				res.db.collection('restaurants').createIndex({resName: 'text'});
				return next();
			}
			res.end('Connection fail!');
		})
	} else {
		res.db = db;
		next();
	}
});
// 01
app.get('/01', (req, res) => {
	res.db.collection('restaurants').find().toArray((err, doc) =>{
		res.json(doc);
	});
});
// 02
app.get('/02', (req, res) => {
	res.db.collection('restaurants').find().project({restaurant_id:1, name:1, district:1, cuisine:1}).toArray((err, doc) =>{
		res.json(doc);
	});
});
// 03
app.get('/03', (req, res) => {
	res.db.collection('restaurants').find().project({_id:0, restaurant_id:1, name:1, district:1, cuisine:1}).toArray((err, doc) =>{
		res.json(doc);
	});
});
// 04
app.get('/04', (req, res) => {
	res.db.collection('restaurants').find().project({_id:0, restaurant_id:1, name:1, district:1, 'address.zipcode':1}).toArray((err, doc) =>{
		res.json(doc);
	});
});
// 05
app.get('/05', (req, res) => {
	res.db.collection('restaurants').find({district: {$eq: 'Bronx'}}).toArray((err, doc) =>{
		res.json(doc);
	});
});
// 06
app.get('/06', (req, res) => {
	res.db.collection('restaurants').find({district: {$eq: 'Bronx'}}).limit(5).toArray((err, doc) =>{
		res.json(doc);
	});
});
// 07
app.get('/07', (req, res) => {
	res.db.collection('restaurants').find({district: {$eq: 'Bronx'}}).skip(5).limit(5).toArray((err, doc) =>{
		res.json(doc);
	});
});
// 08
app.get('/08', (req, res) => {
	res.db.collection('restaurants').find({'address.coord': {$lt: -95.754168}}).toArray((err, doc) =>{
		res.json(doc);
	});
});
// 09
app.get('/09', (req, res) => {
	res.db.collection('restaurants')
		.find({$and: [{cuisine: {$ne: 'American'}}, {"grades.score": {$gt: 70}}, {"address.coord": {$lt: -65.754168}}]})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// 10
app.get('/10', (req, res) => {
	res.db.collection('restaurants')
		.find({name: {$regex: "^Wil"}})
		.project({restaurant_id:1, name:1, cuisine:1, district:1})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// 11
app.get('/11', (req, res) => {
	res.db.collection('restaurants')
		.find({name: {$regex: "ces$"}})
		.project({restaurant_id:1, name:1, cuisine:1, district:1})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// 12
app.get('/12', (req, res) => {
	res.db.collection('restaurants')
		.find({name: {$regex: "Reg"}})
		.project({restaurant_id:1, name:1, cuisine:1, district:1})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// 13
app.get('/13', (req, res) => {
	res.db.collection('restaurants')
		.find({$and: [{cuisine: {$in: ['American', 'Chinese']}}, {district: 'Bronx'}]})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// 14
app.get('/14', (req, res) => {
	res.db.collection('restaurants')
		.find({district: {$in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}})
		.project({restaurant_id:1, name:1, cuisine:1, district:1})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// 15
app.get('/15', (req, res) => {
	res.db.collection('restaurants')
		.find({district: {$nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}})
		.project({restaurant_id:1, name:1, cuisine:1, district:1})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// 16
app.get('/16', (req, res) => {
	res.db.collection('restaurants')
		.find({"grades.score": {$not: {$gt: 10}}})
		.project({restaurant_id:1, name:1, cuisine:1, district:1, grades:1})
		.toArray((err, doc) =>{
			res.json(doc);
		});
});
// Fix cuisine: "American " to "American"
// app.get('/fix', (req, res) => {
// 	// res.db.collection('restaurants').updateMany({"cuisine": "American "}, {$set: {"cuisine": "American"}}, (err, doc) => {
// 	// 	res.end('Data Updated');
// 	// });
// });


app.listen(3000, _ => console.log('Started at 3000'));