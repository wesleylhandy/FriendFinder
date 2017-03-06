const path = require("path");
const friends = require("../data/friends.js");

module.exports = function(app){

	app.get('/api/friends', function (req, res) {

		friends.getAllData()
			.then( (peeps)=> res.json(peeps) )
			.catch( (err)=> {if (err) console.log(err)} );
	});

	app.post('/api/friends', function (req, res){

		friends.findClosestFriend(req.body).then((friend)=>{
			res.json(friend);
		}).catch((err)=>{if (err) console.log(err);});

		//send back closestFriend
	});
}