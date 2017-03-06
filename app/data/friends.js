const fs = require("fs");

var file = './app/data/userData.json';

function updateData (object) {

	if (!fs.existsSync(file)) {
		fs.writeFileSync(file, "[" + JSON.stringify(object) + "]");
	} else {

		fs.readFile(file, 'utf-8', (err, data) => {
			if (err) {
				console.log(err);
			}

			var arr = [];

			if (data) {
				arr = JSON.parse(data);
			}

			arr.push(object);

			fs.writeFile(file, JSON.stringify(arr, null, 5), (err) => {
					if (err) console.log(err);
		
				});
			
		});
	}
}

function getAllData() {

	return new Promise((resolve, reject)=>{

		fs.readFile(file, 'utf-8', (err, data) => {
			if (err) {
				reject(err);
			}

			var arr = [{}];

			if (data) {
				arr = JSON.parse(data);
			}

			resolve(arr);
		});
	});
}

function findClosestFriend (obj) {

	return new Promise((resolve, reject) => {

		getAllData().then((peeps)=>{

			var baseScores = obj.scores;

			baseScores.map((e)=> parseInt(e));

			var closestFriend = {
				name: '',
				photo: '',
				scores: []
			}

			var difference = 10000;

			peeps.forEach((e, i)=>{
				var singleDiff = e.scores.map((e)=> parseInt(e))
					.reduce((accumulator, value, index)=> {
						return accumulator + Math.abs(value - baseScores[index]);
					});

				if (singleDiff < difference) {
					difference = singleDiff;
					closestFriend = peeps[i];
				}
			});

			updateData(obj);
			resolve(closestFriend);

		}).catch((err)=>{if(err) reject(err);});

	});

}

exports.updateData = updateData;
exports.findClosestFriend = findClosestFriend;
exports.getAllData = getAllData;