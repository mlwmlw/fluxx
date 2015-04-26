var Fluxx = require('../../../src/fluxx');
Fluxx.store('list', function() {
	var flux = this;
	var hasInitialized = false;
	var items = [];
	flux.register(function(payload) {
		if (payload.actionType === 'pop') {
			flux.getStore('list').onPop();
		}
		else if (payload.actionType === 'push') {
			flux.getStore('list').onPush(payload.value);
		}
		else if (payload.actionType === 'initial') {
			flux.getStore('list').onInitial(payload.value);
		}
	})
	return {
		hasInitialized: function() {
			return hasInitialized;
		},
		getItems: function() {
			return items;
		},
		onInitial: function(_items) {
			hasInitialized = true;
			items = _items;
			this.emit('change');
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
