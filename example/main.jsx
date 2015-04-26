var Fluxx = require('../src/fluxx');
var React = require('react');

Fluxx.store('list', function() {
	var items = [1,2,3,4,5,6];
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
var List = React.createClass({
	mixins: [Fluxx.mixin(React)],
	getInitialState: function() {
		this.list = this.flux().getStore('list')
		return {items: this.list.getItems()};
	},
	componentDidMount: function() {
		this.list.addListener('change', this._onChange);
	},
	componentDidUnmount: function() {
		this.list.remvoeListener('change', this._onChange);
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
var Button = React.createClass({
	mixins: [Fluxx.mixin(React)],
	render: function() {
		return <button onClick={this.props.onClick}>{this.props.children}</button>
	}
});
var App = React.createClass({
	mixins: [Fluxx.mixin(React)],
	getInitialState: function() {
		return {};
	},
	pop: function() {
		this.flux().getAction().pop();
	},
	push: function() {
		var list = this.flux().getStore('list');
		this.flux().getAction().push(list.getItems().length + 1);
	},
	render: function() {
		return <div>
				<Button onClick={this.pop}>POP</Button>
				<Button onClick={this.push}>PUSH</Button>
				<List />
			</div>
	}
});
var flux = new Fluxx();
flux.register(function(payload) {
	
	if (payload.actionType === 'pop') {
		flux.getStore('list').onPop();
	}
	else if (payload.actionType === 'push') {
		flux.getStore('list').onPush(payload.value);
	}
});
React.render(<App flux={{flux}} />, document.getElementById('container'));
