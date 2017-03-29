var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./app/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


//Points incomming request to routes files
routes(app);


app.listen(8080, function () {
  console.log('Listening on port 8080!');
});
