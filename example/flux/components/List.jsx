var React = require('react');
var Fluxx = require('../../../src/fluxx');
var List = React.createClass({
	mixins: [Fluxx.mixin(React)],
	getInitialState: function() {
		this.list = this.flux().getStore('list');
		return {items: this.list.getItems()};
	},
	componentWillMount: function() {
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

module.exports = List;
