const fs = require('fs');
const config = require('config');
const now = require('moment');
var express = require('express');
var router = express.Router();
const path = require('path');
const RestClient = require('node-rest-client').Client;
const rest = new RestClient();

const MongoClient = require('mongodb').MongoClient;
var mongo;
var getMongoClient = () => {
	return new Promise((resolve, reject) => {
		if (mongo) return resolve(mongo);
		MongoClient.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}`)
		.then((client) => {
			mongo = client;
			resolve(client);
		})
		.catch(error => {
			console.trace(error);
		});
	});
};

/* GET home page. */
router.get('/', function(req, res, next) {
	//
	// getMongoClient().then(client => {
	// 	const moisture_collection = client.db(config.mongodb.db).collection(config.mongodb.moisture_collection);
	// 	var records = [];
		
	// 	collection
	// 	.find({capturedDate: {$gte: now().add({days: -1}).format()}})
	// 	.sort({'capturedDate': -1})
	// 	.toArray()
	// 	.then(hits => {
	// 		hits.forEach(hit => {
	// 			const base = path.resolve(__dirname, '../public');
	// 			const cam = config.get(`cameras.${hit.sender}`);
	// 			records.push({
	// 				time: now(hit.capturedDate).locale('ja').format('llll'),
	// 				event: (hit.event === 'Posted') ? '投函されました' : (hit.event === 'Pulled') ? '取り出されました' : '不明',
	// 				img: fs.existsSync(hit.file) ? hit.file.substr(base.length) : "",
	// 				camera: cam ? cam.name : "",
	// 				attr: (hit.event === 'Posted') ? 'bg-warning' : 'bg-success'
	// 			});
	// 		});
	// 		console.log(records);
	// 	})
	// 	.then(() => {
	// 		rest.get(`http://${config.receiverRest.host}:${config.receiverRest.port}/${config.receiverRest.url}`, (data, response) => {
    //     		console.log(Buffer.from(data).toString());
	// 		});
	// 		const ids = Object.keys(config.cameras);
	// 		var cameras = []
	// 		for (var id in config.cameras) {
	// 			cameras.push(config.cameras[id])
	// 		}
	// 		res.render('index', {
	// 			title: 'rny',
	// 			cameras: cameras,
	// 			records: records					
	// 		});
	// 	});
	// })
	// .catch(err => {
	// 	console.error(err);
	// });
});

// router.get('/sensors', function(req, res, next) {
// 	getMongoClient().then(client => {
// 		const collection = client.db(config.mongodb.db).collection(config.mongodb.sensor_collection);
		
// 		collection
// 		.find({},{ _id: 0, version: 0 })
// 		.toArray()
// 		.then(sensors => {
// 			res.render('index', {
// 				title: 'あさがお',
// 				sensors: sensors
// 			});
// 		});
// 	})
// 	.catch(err => {
// 		console.error(err);
// 	});
// });

// router.put('/sensor', function(req, res, next) {
// 	var file = path.resolve(__dirname, '../public' + req.body.file);
// 	fs.unlink(file, err => {
// 		if (err)	 throw err;
// 		console.log(file + ' is deleted.');
// 	});
// 	res.send('deleted');
// });

module.exports = router;
