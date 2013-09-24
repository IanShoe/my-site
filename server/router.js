var path = require('path');
var clientDir = path.join(__dirname, '../client');

exports.resources = function(req, res){
	res.sendfile(clientDir + req.path);
};

exports.index = function(req, res){
	res.sendfile(clientDir + '/index.html');
};