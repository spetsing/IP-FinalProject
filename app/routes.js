module.exports = function(app) {

var mongooseModel = require("./model");


app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/../public/index.html'));
});


};
