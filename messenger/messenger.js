const config = require('config');
const dbConfig = config.get("mongodb");
const notifierConfig = config.get("notifier");

const threshold = config.get("moisture").threshold;

const MongoClient = require('mongodb').MongoClient;

const RestClient = require('node-rest-client').Client;
const rest = new RestClient();

MongoClient.connect(`mongodb://${dbConfig.host}:${dbConfig.port}`)
.then((client) => {
	process.on('SIGINT', () => {
		client && client.close()
		.then(() => {
			console.log('Pressed Ctrl-c (received SIGINT)');
			process.exit(0);
		})
		.catch((err) => {
			console.log(err);
		});
	});

	process.on('SIGTERM', () => {
		client && client.close()
		.then(() => {
			console.log('Received SIGTERM');
			process.exit(0);
		})
		.catch((err) => {
			console.log(err);
		});
	});
	
	const col = client.db(dbConfig.db).collection(dbConfig.collection);
	col.isCapped().then(
			(response) => {
				if (!response) {
					console.log("The collection must be a capped one.");
					client.close()
					.then(() => {
						process.exit(-1);
					});
				}
			},
			(reject) => {
				console.log(reject);
				process.exit(-1);
			});

	const now = require('moment');
	var cursor = col.find({'received_at': {$gt : now().format()}});
	// set tailable cursor
	cursor.addCursorFlag('tailable', true);
	cursor.addCursorFlag('awaitData', true);
	cursor.addCursorFlag('noCursorTimeout', true);
	cursor.sort([['$natural', 1]]);

	// loop and wait for coming a new record forever
	cursor.forEach(
			(response) => {
				if (response.content_type.match(/soilmoisturemonitor/) && response.data.moisture > threshold) {
					console.log(response);
					var args = {
							'data': {"soilmoisture": response.data.moisture},
							'headers': {'Content-Type': 'application/json'}
					};
					rest.post(`http://${notifierConfig.host}:${notifierConfig.port}/`, args, (data, response) => {
						console.log(data);
					});
				}
			},
			(reject) => {
				console.log("rec:" + reject);
			}
		);
})
.catch((err) => {
	console.log("Connecting db failed:" + err);
});
