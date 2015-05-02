var Fluxx = require('../../../src');
var fetch = require('../utils/fetch');
var actions = Fluxx.action({
	all: function() {
		var flux = this.flux;
		if(flux.getStore('list').hasInitialized())
			return;
		return fetch('/api/list.json').then(function(res) {
			return res.json();
		}).then(function(data) {
			flux.getActions().initial(data);
			return data;
		});
	},
	pop: function() {
		this.flux.getActions().pop.dispatch();
	},
	push: function(data) {
		this.flux.getActions().push.dispatch(data);
	},
	initial: function(data) {
		this.flux.getActions().initial.dispatch(data);
	}
});
