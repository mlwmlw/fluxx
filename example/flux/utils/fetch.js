var fetch = require('isomorphic-fetch');
module.exports = function(path, init) {
	init = init || {};
	if(typeof(window) !== 'undefined') {
		return fetch(path, init);
	}
	else {
		return fetch('http://localhost:8080' + path, init);
	}
}
