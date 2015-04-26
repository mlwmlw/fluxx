var React = require('react');
var Fluxx = require('../../../src/fluxx');
var Button = React.createClass({
	mixins: [Fluxx.mixin(React)],
	render: function() {
		return <button onClick={this.props.onClick}>{this.props.children}</button>
	}
});
module.exports = Button;
