var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _storeFactories = {};
var _instances = []
var _id = 0;
var genId = function() {
	var id = _id;
	_id++;
	return id;
}
var Fluxx = function() {
	var _store = [];
	var F = function() {};
	var id = genId();
	F.prototype = new Dispatcher;
	F.prototype.getStore = function(name) {
		return _store[name];
	}
	
	
	var instance = _instances[id] = new F();
	F.prototype.createStore = function(name) {
		return _store[name] = assign({}, EventEmitter.prototype, _storeFactories[name].apply(instance));
	}
	F.prototype.getAction = function(name) {
		name = name || 'global';
		var actions = {}
		for(var i in _actions[name]) { 
			actions[i] = _actions[name][i].bind(instance);
		}
		return actions;
	}
	for(var i in _storeFactories) {
		instance.createStore(i);
	}
	return instance;
};

Fluxx.store = function(name, factory) {
	_storeFactories[name] = factory;
	for(var i in _instances) {
		_instances[i].createStore(name);
	}
};

var _actions = {};
Fluxx.action = function(name, actions) {
	if(!actions) {
		actions = name;
		name = 'global';
	}
	if(!_actions[name])
		_actions[name] = {};
	for(var i in actions) { 
		_actions[name][i] = actions[i];
	}
};

Fluxx.mixin = function(React) {
	var getContext = function(com) {
    return com.props.flux || (com.context && com.context.flux);
	}
	return {
		contextTypes: {
			flux: React.PropTypes.object
		},
		childContextTypes: {
			flux: React.PropTypes.object
		},
		componentWillMount: function() {
		},
		getChildContext: function() {
			return {
				flux: getContext(this),
			};
		},
		flux: function() {
			return getContext(this).flux;
		}
	}
}
module.exports = Fluxx;
