const path = require("path");
const friends = require("../data/friends.js");

module.exports = function(app){

	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"))
		// res.sendFile("home.html");
	});

	app.get('/survey', function (req, res) {
	  	res.sendFile(path.join(__dirname, "../public/survey.html"))
	});

	//come back to this....
	app.get('*', function(req, res, next){
	    res.status(404).sendFile(path.join(__dirname, "../public/not-found.html"));
	});

}