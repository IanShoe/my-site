Array.prototype.advancedFind = function(instance, properties) {
	var found = {};
	if(!instance){
		throw new Error("No instance specified");
	}
	if(!properties){
		for (var i = 0; i < this.length; i++) {
			if (this[i] === instance) {
				found.index = i;
				found.item = this[i];
				return found;
			}
		}
	}
	if(properties instanceof Array){
		if(properties.length === 0) {
			throw new Error("No properties specified");
		}
		for (var i = 0; i < this.length; i++) {
			var matching = true;
			for(var j= 0; j < properties.length; j++){
				if (!(this[i][properties[j]] === instance[properties[j]] || this[i][properties[j]] === instance)) {
					matching = false;
					break;
				}
			}
			if(matching){
				found.index = i;
				found.item = this[i];
				return found;
			}
		}
	}
	else if(isString(properties)){
		if(properties === '') {
			throw new Error("No property specified");
		}
		for (var i = 0; i < this.length; i++) {
			if (this[i][properties] === instance[properties] || this[i][properties] === instance) {
				found.index = i;
				found.item = this[i];
				return found;
			}
		}
	}
	return null;
};

Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] == obj) return true;
	}
	return false;
};

Array.prototype.move = function(from,to){
	this.splice(to,0,this.splice(from,1)[0]);
	return this;
};

Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

Array.prototype.upsert = function(instance, properties) {
	var found = this.advancedFind(instance, properties);
	if(found){
		this.splice(found.index, 1, instance);
	}
	else{
		this.push(instance);
	}
};

// String protoypes

String.prototype.camelCaseToDashed = function() {
	return this.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

String.prototype.isLower = function() {
	return /[a-z]/.test(this);
};

String.prototype.isUpper = function() {
	return /[A-Z]/.test(this);
};

String.prototype.jam = function(str, position, delimiter) {
	if (!str) return this.toString();
	if (this.length === 0) {
		return str;
	}

	position = position || 0;
	delimiter = delimiter || '';

	var parts = this.split(delimiter);
	parts.splice(position, 0, str);
	return parts.join(delimiter);
};

String.prototype.loweredAndDashed = function() {
	return this.toLowerCase().split(' ').join('-');
};

String.prototype.proper = function() {
	    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.retrieveByDelimitation = function(positions, delimiter) {
	if(positions !== 0 && !positions) return null;
	if(!delimiter) return this.toString();
	var parts = this.split(delimiter);
	if(positions instanceof Array) {
		var newArray = [];
		for(var i = 0; i < positions.length; i++){
			newArray.push(parts[positions[i]]);
		}
		return newArray;
	}
	else {
		return parts[positions];
	}
};

String.prototype.toCamelCase = function() {
	return this.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
		if (p2) return p2.toUpperCase();
		return p1.toLowerCase();        
	});
};

function isString(obj) {
	return toString.call(obj) == '[object String]';
}

function unCamel(string){
	var camelString = '';
	for (var i = 0; i < string.length; i++) {
		if(i == 0){
			camelString = camelString.concat(string[i].toUpperCase());
			continue;
		}
		else if(string[i].isUpper()){
			camelString = camelString.concat(' ');
		}
		camelString = camelString.concat(string[i]);
	};
	return camelString;
}

// Version 4 (random) UUID generator
function generateUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);})
};