//server.js
'use strict';
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./model/books.js');
//and create our instances
const app = express();
const router = express.Router();
//set our port to either a predetermined port number if you have set it up, or 3001
const port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://fil:donskoy@ds113640.mlab.com:13640/library');
mongoose.connection.on('error', function(error) {
	console.error('Database connection error:', error);
});

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,HEAD,OPTIONS,POST,PUT,DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
	);
	//and remove cacheing so we get the most recent books
	res.setHeader('Cache-Control', 'no-cache');
	next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!' });
});
//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
	console.log(`api running on port ${port}`);
});

//adding the /books route to our /api router
router
	.route('/books')
	//retrieve all books from the database
	.get(function(req, res) {
		//looks at our Book Schema
		Book.find(function(err, books) {
			if (err) res.send(err);
			//responds with a json object of our database books.
			res.json(books);
		});
	})
	//post new book to the database
	.post(function(req, res) {
		let book = new Book();
		//body parser lets us use the req.body
		book.author = req.body.author;
		book.text = req.body.text;
		book.save(function(err) {
			if (err) res.send(err);
			res.json({ message: 'Book successfully added!' });
		});
	});
