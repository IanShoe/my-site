var express = require('express');
var app = module.exports = express();

var splitList = __dirname.split('/');
var clientDir = splitList.splice(0, splitList.length -1).join('/') + '/client';

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('bossSauce'));
	app.use(express.session());
	app.use(app.router);
	app.use('/\/resources|views|modules\/?.*/', express.static(clientDir));
});
console.log(__dirname);

app.get(/\/resources|views|modules\/?.*/, function(req, res){
	res.sendfile(clientDir + req.path);
});

app.get('/*', function(req, res){
	res.sendfile(clientDir + '/index.html');
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.listen(8080, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});