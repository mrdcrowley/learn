var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
	db = mongoClient.db("posts");
	db.collection('post', {strict:true}, function(err, collection) {
		if (err) {
			console.log("The 'post' collection doesn't exist. Creating it with sample data...");
			populateDB();
		}
	});
});

exports.findPost = function(req, res) {
	var id = parseInt(req.params.id);
	console.log('findPost: ' + id);
	db.collection('posts', function(err, collection) {
		collection.find({'id': id}).toArray(function(err, items) {
			console.log(items);
			res.jsonp(items);
		});
	});
};

 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
	console.log("Populating database(s)...");

	var post = [
		{
			"id": 1
			, "author": 1
			, "credit": "http://en.wikipedia.org/wiki/Paul_Erd%C5%91s"
			, "text": "Finally, I am becoming stupid no more."
		},
		{
			"id": 2
			, "author": 2
			, "credit": "http://en.wikipedia.org/wiki/Andreas_Vesalius"
			, "text": "I am not accustomed to saying anything with certainty after only one or two observations."
		}
	];
 
	db.collection('posts', function(err, collection) {
		collection.insert(post, {safe:true}, function(err, result) {});
	});
 
};