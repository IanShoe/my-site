var express = require('express');
var router = require('./router');
var app = module.exports = express();

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('bossSauce'));
	app.use(express.session());
	app.use(app.router);
});

app.get(/\/bower_components|resources|views|modules\/?.*/, router.resources);

app.get('/*', router.index);

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.listen(8080, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});