var path = require('path');
var util = require('util');
var nconf = require('nconf');

var mode = (process.env.NODE_ENV || 'development').toLowerCase();
nconf.use('file', { file: './config.json' });
nconf.load();

var myLevels = {
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
};

var myLevelLabels = {};
myLevelLabels[myLevels.error] = 'ERROR';
myLevelLabels[myLevels.warn] = 'WARN';
myLevelLabels[myLevels.info] = 'INFO';
myLevelLabels[myLevels.debug] = 'DEBUG';

var myLevel = myLevels[nconf.get(mode+':logLevel')] || myLevels['info'];

var formatRegExp = /%[sdj%]/g;
var inspect = util.inspect;

var format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      case '%%': return '%';
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else if (x instanceof Error) {
        str += '\n' + x.stack;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

exports.newLogger = function(category) {
    return new Logger(category);
};

exports.forFile = function(filename) {
    return exports.newLogger(path.basename(filename));
};

// Logger Class ---------------------------------------------------------------

var Logger = function(category) {
    this._category = category;
};

var proto = Logger.prototype;

proto.isLevel = function(level) {
    return (myLevels[level] || myLevels['info']) <= myLevel;
};

proto.setLevel = function(level) {
    myLevel = myLevels[level] || myLevels['info'];
};

proto.isInfo = function() {
    return this.isLevel('info');
};

proto.info = function() {
    this.log('info', arguments);
};

proto.isDebug = function() {
    return this.isLevel('debug');
};

proto.debug = function() {
    this.log('debug', arguments);
};

proto.isWarn = function() {
    return this.isLevel('warn');
}

proto.warn = function() {
    this.log('warn', arguments);
}

proto.isError = function() {
    return this.isLevel('error');
};

proto.error = function() {
    this.log('error', arguments);
};

proto.trace = function() {
    console.trace();
};

proto.log = function(level, args) {

    if (this.isLevel(level)) {
        args = args || [];
        var sep = ' | ';
        var label =  myLevelLabels[myLevels[level]];
        var prefix = (new Date()) + sep + this._category + sep + label  + sep;
        util.puts(prefix + format.apply(this, args));
    }
};