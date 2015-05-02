var Fluxx = require('../src');
var React = require('react');
var App = require('./flux/components/App');

var flux = new Fluxx();
flux.rehydrate(window.__dehydrated);
React.render(<App flux={flux} />, document.getElementById('container'));
