var Fluxx = require('../../../src/fluxx');
var actions = Fluxx.action({
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
	}
});
