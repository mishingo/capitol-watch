/**
 * Main application routes
 */

'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/user_votes', require('./api/user_vote'));
  app.use('/api/votess', require('./api/votes'));
  app.use('/api/ubills', require('./api/ubill'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  /*app.get('/api/twitter', passport.authenticate('twitter', {
    failureRedirect: '/login'
  }));

  app.get('/api/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));*/

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
