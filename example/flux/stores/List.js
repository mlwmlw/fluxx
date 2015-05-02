var Fluxx = require('../../../src');
Fluxx.store('list', function() {
	var flux = this.flux;
	var actions = flux.getActions();
	var hasInitialized = false;
	var items = [];
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
		},
		dehydrate: function() {
			return [items, hasInitialized];
		},
		rehydrate: function(state) {
			items = state[0];
			hasInitialized = state[1];
		},
		token: flux.listenTo('list', function(on) {
			on(actions.pop, 'onPop');
			on(actions.push, 'onPush');	
			on(actions.initial, 'onInitial');	
		})
	};
});
