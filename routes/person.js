var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
	db = mongoClient.db("people");
	db.collection('person', {strict:true}, function(err, collection) {
		if (err) {
			console.log("The 'person' collection doesn't exist. Creating it with sample data...");
			populateDB();
		}
	});
});

exports.findPerson = function(req, res) {
	var username = req.params.username;
	console.log('findPerson: ' + username);
	db.collection('person', function(err, collection) {
		collection.find({'username': username}).toArray(function(err, items) {
			console.log(items);
			res.jsonp(items);
		});
	});
};

 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
	console.log("Populating employee database(s)...");

	var person = [
		{
			"id": 1
			, "username": "mrdcrowley"
			, "twitter": "mrdcrowley"
			, "email": "david@slantback.net"
		},
		{
			"id": 2
			, "username": "slantback"
			, "twitter": "slantback"
			, "email": "david@slantback.net"
		}
	];
 
	db.collection('people', function(err, collection) {
		collection.insert(person, {safe:true}, function(err, result) {});
	});
 
};