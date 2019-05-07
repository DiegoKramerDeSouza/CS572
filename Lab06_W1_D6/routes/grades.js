const express = require('express');
const router = express.Router();
const jsonParser = express.json();

let grades = [
    {id: 'st001', name: 'John', course: 'CS572', grade: '95'},
    {id: 'st002', name: 'Ross', course: 'CS572', grade: '90'},
    {id: 'st003', name: 'Ann', course: 'CS572', grade: '93'}
]

// GET all
router.route('/')
    .get( jsonParser,
        function(req, res, next){
            if(req.query.id) return next('route');
            console.log(grades);
            return next();
        },
        function(req, res){
            res.send(grades);
            res.end();
        }
    ) // POST data
	.post( jsonParser,
        function(req, res, next){
            if(req.query){
                grades.push(req.query);
                return next();
            } else {
                res.status(404).end();
            }
        },
        function(req, res){
            console.log(grades);
            res.send(grades);
            res.end();
        }
    );
// GET one with query
router.route('/')
    .get( jsonParser,
        function(req, res, next){
			console.log(req.body);
            console.log(grades.filter(grade => grade.id == req.query.id));
            return next();
        },
        function(req, res){
            res.send(grades.filter(grade => grade.id == req.query.id));
            res.end();
        }
    );
// GET one with params
router.route('/:id')
    .get( jsonParser,
        function(req, res, next){
            if(req.params){
                console.log(grades.filter(grade => grade.id == req.params.id));
                return next();
            } else {
                res.status(404).end();
            }
        },
        function(req, res){
            res.send(grades.filter(grade => grade.id == req.params.id));
            res.end();
        }
    ) // PUT data
    .put( jsonParser,
        function(req, res, next){
            if(req.params.id && req.query){
                console.log(req.query);
                return next();
            } else {
                res.status(404).end();
            }
        },
        function(req, res){
            let target = grades.indexOf(grades.find(grade => grade.id == req.params.id));
            grades[target] = req.query;
            res.send(grades);
            res.end();
        }
    ) // DELETE one with params
	.delete( jsonParser,
        function(req, res, next){
            if(req.params){
                console.log(grades.filter(grade => grade.id != req.params.id));
                return next();
            } else {
                res.status(404).end();
            }
        }, 
        function(req, res){
            grades = grades.filter(grade => grade.id != req.params.id)
            res.send(grades);
            res.end();
        }
    );

module.exports = router;