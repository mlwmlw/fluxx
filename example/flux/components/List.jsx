var React = require('react');
var Fluxxx = require('../../../src');
var List = React.createClass({
	mixins: [Fluxxx.mixin(React)],
	getInitialState: function() {
		this.list = this.flux().getStore('list');
		return {items: this.list.getItems()};
	},
	componentDidMount: function() {
		this.list.addListener('change', this._onChange);
	},
	componentDidUnmount: function() {
		this.list.remvoeListener('change', this._onChange);
	},
	render: function() {
		var lis = this.state.items.map(function(value, k) {
			return <li key={k}>{value}</li>
		});
		return <ul>{lis}</ul>
	},
	_onChange: function() {
		this.setState(this.getInitialState());
	}
});

module.exports = List;
