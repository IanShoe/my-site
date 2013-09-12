var mongo = require('mongodb');
var nconf = require('nconf');
var logger = require('../services/logging').forFile(__filename);

var MongoDBTier = function(configFile) {
	configFile ? nconf.use('file', { file: configFile }) : nconf.use('file', { file: './config.json' });
	nconf.load();

	this.url = nconf.get('mongo:url');
	this.port = parseInt(nconf.get('mongo:port'));
	this.database = nconf.get('mongo:db');

	this.db = mongo.Db(this.database, new mongo.Server(this.url, this.port, {auto_reconnect: true}), {w:1});

	logger.info('Using mongo URL: ' + nconf.get('mongo:url'));
	logger.info('Using mongo Port: ' + nconf.get('mongo:port'));
	logger.info('Using mongo Database: ' + nconf.get('mongo:db'));
};

MongoDBTier.prototype.getInfo = function() {
	logger.info('Using Mongo URL: ' + nconf.get('mongo:url'));
	logger.info('Using Mongo Port: ' + nconf.get('mongo:port'));
	logger.info('Using Mongo Database: ' + nconf.get('mongo:db'));
};

MongoDBTier.prototype.getSingle = function(collection, query, projection, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			if(!projection){
				projection = {};
			}
			projection._id = 0;
			collection.findOne(query, projection, {safe: true}, function (error, results){
				if (error) {
					callback(error); 
				} else {
					callback(null, results);
				}
			});	
		}
	});
};

MongoDBTier.prototype.getList = function(collection, query, projection, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			if(!projection){
				projection = {};
			}
			projection._id = 0;
			collection.find(query, projection).toArray(function(error, results){
				if (error) {
					callback(error);
				} else {
					callback(null, results);
				}
			});
		}
	});
};

MongoDBTier.prototype.insertSingle = function(collection, data, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error); 
		} else {
			collection.insert(data, {safe: true}, function (error, results) {
				if (error) {
					callback(error);
				} else {
					callback(null, results);
				}
			});	
		}
	});	
};

MongoDBTier.prototype.insertList = function(collection, data, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			var successCount = 0;
			(function insertListItem(i) {
				if (i < data.length) {
					collection.insert(data[i], {safe: true}, function (error, results) {
						if (error) {
							callback(error);
						} else {
							successCount++;
							insertListItem(++i);
						}
					});
				} else {
					callback(null, successCount);
				}	
			})(0);
		}
	});	
};

MongoDBTier.prototype.upsertSingle = function(collection, query, data, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			collection.update(query, data, {safe: true, upsert: true}, function (error) {
				if (error) {
					callback(error);
				} else {
					callback();
				}
			});	
		}
	});	
};

MongoDBTier.prototype.updateSingle = function(collection, query, data, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			collection.update(query, {$set: data}, {safe: true}, function (error) {
				if (error) {
					callback(error);
				} else {
					callback();
				}
			});	
		}
	});	
};

MongoDBTier.prototype.updateSingleCustom = function(collection, query, update, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			collection.update(query, update, {safe: true}, function (error) {
				if (error) {
					callback(error);
				} else {
					callback();
				}
			});	
		}
	});	
};

MongoDBTier.prototype.remove = function(collection, query, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) {
			callback(error);
		} else {
			collection.remove(query, function(error) {
				if (error) {
					callback(error);
				} else {
					callback()
				}
			});
		}
	});
};

MongoDBTier.prototype.aggregate = function(collection, callback) {
	this.db.collection(collection, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			callback(null, collection.aggregate);
		}
	});	
};

MongoDBTier.prototype.dropCollection = function(collection, callback) {
	this.db.collection(collection, {safe:false, strict:false}, function(error, collection) {
		if (error) { 
			callback(error);
		}  else if(collection) {
			collection.drop(function (error) {
				if (error) {
					callback(error);
				} else {
					callback();
				}
			});
		} else{
			callback();
		}		
	});
};

MongoDBTier.prototype.getCollection = function(name, callback) {
	this.db.getCollection(name, function(error, collection) {
		if (error) { 
			callback(error);
		} else {
			callback(null, collection);
		}
	});	
};

MongoDBTier.prototype.getCollections = function(callback) {
	this.db.collections(function(error, collections) {
		if (error) { 
			callback(error);
		} else {
			callback(null, collections);
		}
	});	
};

MongoDBTier.prototype.getCollectionNames = function(callback) {
	this.db.collectionNames(function(error, collectionNames) {
		if (error) { 
			callback(error);
		} else {
			callback(null, collectionNames);
		}
	});	
};

module.exports = new MongoDBTier();
// module.exports = function(config) {
// 	return new MongoDBTier(config);
// }



// module.exports = function(db) {
//   return {
//     start : function(input){
//     // makeThumbnail
//     // save timestamp
//     db.save({...});
//   }
// };

// var db = require('./database.js'),
// makeThumbnail = require('./tasks/makeThumbnail')(db);