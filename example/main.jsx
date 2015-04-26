var Fluxx = require('../src/fluxx');
var React = require('react');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var flux = new Fluxx();

var listStore = (function() {
	var items = [1,2,3,4,5,6];
	return assign({}, EventEmitter.prototype, {
		getItems: function() {
			return items;
		},
		onPop: function() {
			items.pop();
			this.emit('change');
		}
	});
})();
var List = React.createClass({
	getInitialState: function() {
		return {items: listStore.getItems()};
	},
	componentDidMount: function() {
		listStore.addListener('change', this._onChange);
	},
	render: function() {
		var lis = this.state.items.map(function(i) {
			return <li>{{i}}</li>
		});
		return <ul>{{lis}}</ul>
	},
	_onChange: function() {
		this.setState(this.getInitialState());
	}
});
flux.register(function(payload) {
	  if (payload.actionType === 'pop') {
			listStore.onPop();
		}
});
var Button = React.createClass({
	action: function() {
		flux.dispatch({
			actionType: 'pop'
		});
	},
	render: function() {
		return <button onClick={this.action}>Hello World</button>
	}
});
var App = React.createClass({
	render: function() {
		return <div><Button /><List /></div>
	}
});
React.render(<App />, document.getElementById('container'));
