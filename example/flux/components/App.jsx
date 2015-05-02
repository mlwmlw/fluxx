var React = require('react');
var Fluxxx = require('../../../src');
var Button = require('./Button');
var List = require('./List');
require('../stores/list');
require('../actions/actions');
module.exports = React.createClass({
	mixins: [Fluxxx.mixin(React)],
	getInitialState: function() {
		this.actions = this.flux().getActions();
		return {};
	},
	componentWillMount: function() {
		this.actions.all();
	},
	pop: function() {
		this.actions.pop();
	},
	push: function() {
		var list = this.flux().getStore('list');
		this.actions.push(list.getItems().length + 1);
	},
	render: function() {
		return <div>
				<Button onClick={this.pop}>POP</Button>
				<Button onClick={this.push}>PUSH</Button>
				<List />
			</div>
	}
});
