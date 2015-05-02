require('babel/register');
var express = require('express'),
    app = express(),
    React = require('react'),
    Fluxxx = require('../src'),
    App = require('./flux/components/App.jsx');

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/build', express.static('build'));
app.use('/api', express.static('api'));
app.use(require('body-parser').json()); // Post requests in application/json

//
// Authentication middleware. Populates req.user and sets cookie.
//
app.use(function(req, res, next) {
	if(req.path != '/')
		return;
  var flux = new Fluxxx();
  var app = React.createElement(App, {flux: flux});
  React.renderToString(app);
	flux.ready(function() {
		var html = React.renderToString(app);
		res.render('index', {html: html, dehydratedStr: JSON.stringify(flux.dehydrate())});
	});
});

var server = app.listen(8080, function() {
  console.log('Server listening at http://%s:%s',
		server.address().address, server.address().port);
});
