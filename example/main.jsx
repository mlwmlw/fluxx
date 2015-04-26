var Fluxx = require('../src/fluxx');
var React = require('react');
var App = require('./flux/components/App');
require('./flux/stores/list');
require('./flux/actions/actions');

var flux = new Fluxx();

React.render(<App flux={{flux}} />, document.getElementById('container'));
