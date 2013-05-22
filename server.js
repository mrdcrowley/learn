var express = require('express'),
    wines = require('./routes/employee');
    people = require('./routes/person');
    posts = require('./routes/post');
 
var app = express();

app.get('/person/:username', people.findPerson);
app.get('/post/:id', posts.findPost);


app.get('/employees/:id/reports', wines.findByManager);
app.get('/employees/:id', wines.findById);
app.get('/employees', wines.findAll);

app.listen(3000);
console.log('Listening on port 3000...');