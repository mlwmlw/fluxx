var React = require('react');
var Fluxx = require('../../../src/fluxx');
var Button = require('./Button');
var List = require('./List');
module.exports = App = React.createClass({
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
