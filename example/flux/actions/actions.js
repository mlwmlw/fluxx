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
			flux.dispatch({
				actionType: 'initial',
				value: data
			});	
		});
	},
	pop: function() {
		this.dispatch({
			actionType: 'pop'
		});
	},
	push: function(data) {
		this.dispatch({
			actionType: 'push',
			value: data
		});
	},
	initial: function(data) {
		this.dispatch({
			actionType: 'initial', 
			value: data
		});
	}
});
