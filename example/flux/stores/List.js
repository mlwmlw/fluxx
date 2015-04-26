var Fluxx = require('../../../src/fluxx');
Fluxx.store('list', function() {
	var flux = this;
	var items = [1,2,3,4,5,6];
	flux.register(function(payload) {
		if (payload.actionType === 'pop') {
			flux.getStore('list').onPop();
		}
		else if (payload.actionType === 'push') {
			flux.getStore('list').onPush(payload.value);
		}
	})
	return {
		getItems: function() {
			return items;
		},
		onPop: function() {
			items.pop();
			this.emit('change');
		},
		onPush: function(value) {
			items.push(value)
			this.emit('change');
		}
	};
});
