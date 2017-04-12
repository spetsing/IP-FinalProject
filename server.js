var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./app/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//points to directory that holds views and controllers
app.use(express.static(__dirname + '/public'));


//Points incomming request to routes files(Where API's Live)
routes(app);


app.listen(3001, function () {
  console.log('Listening on port 3001!');
});
