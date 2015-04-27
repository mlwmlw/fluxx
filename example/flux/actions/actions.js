var Fluxx = require('../../../src/fluxx');
var fetch = require('../utils/fetch');
var actions = Fluxx.action({
	all: function() {
		var flux = this;
		if(flux.getStore('list').hasInitialized())
			return;
		fetch('/api/list.json').then(function(res) {
			return res.json();
		}).then(function(data) {
			flux.getActions().initial.dispatch(data);
		});
	},
	pop: function() {
		this.getActions().pop.dispatch();
	},
	push: function(data) {
		this.getActions().push.dispatch(data);
	},
	initial: function(data) {
		this.getAction.initial.dispatch(data);
	}
});
