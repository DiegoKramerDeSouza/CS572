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
			if(err) throw err;
			db = client.db('homework09');
			res.db = db;
			return next();
		})
	} else {
		res.db = db;
		next();
	}
});
// Exercise 01
app.get('/01', (req, res) => {
	db.collection('zipcodes').aggregate([
		{$match: {state: "WA"}},
		{$group: {
			_id: {"state": "$state"},
			zipcodes: {$push: "$_id"}
		}},
		{$unwind: "$zipcodes"},
		{$project: {
			_id: 0,
			"zip-codes": "$zipcodes"
		}}
	])
	.toArray((err, data) => {
		res.json(data);
	});
});
// Exercise 02
app.get('/02', (req, res) =>{
	db.collection('zipcodes').aggregate([
		{$match: {pop: {$lt: 5000}}},
		{$project: {
			_id: 0,
			"zip-code": "$_id"
		}}
	])
	.toArray((err, data) =>{
		res.json(data);
	});
});
// Exercise 03
app.get('/03', (req, res) => {
	db.collection('zipcodes').aggregate([
		{$group: {
			_id: {"state":"$state", "city": "$city"},
			numOfZip: {$sum: 1}
		}},
		{$match: {"numOfZip": {$gt: 1}}},
		{$sort: {"_id.state":1, "_id.city": 1}},
		{$project: {
			_id: 0,
			state: "$_id.state",
			city: "$_id.city"
		}}
	])
	.toArray((err, data) =>{
		res.json(data);
	});
});
// Exercise 04
app.get('/04', (req, res) =>{
	db.collection('zipcodes').aggregate([
		{$group: {
			_id: {state: "$state", city: "$city"},
			population: {$addToSet: "$pop"}
		}},
		{$sort: {"_id.state": 1, "population": -1}},
		{$group: {
			_id: "$_id.state",
			city: {$last: "$_id.city"},
			population: {$last: "$population"}
		}},
		{$sort: {"_id": 1}},
		{$project: {
			_id: 0,
			state: "$_id",
			city: 1,
			population: 1
		}}
	])
	.toArray((err, data) =>{
		res.json(data);
	});
})

app.listen(3000, _ => console.log('Started at 3000'));