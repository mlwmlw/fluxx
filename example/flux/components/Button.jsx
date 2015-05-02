var React = require('react');
var Fluxxx = require('../../../src');
var Button = React.createClass({
	mixins: [Fluxxx.mixin(React)],
	render: function() {
		return <button onClick={this.props.onClick}>{this.props.children}</button>
	}
});
module.exports = Button;
