'use strict';

var _ = require('lodash');
var UserVote = require('./user_vote.model');

// Get list of user_votes
exports.index = function(req, res) {
  UserVote.find(function (err, user_votes) {
    if(err) { return handleError(res, err); }
    return res.json(200, user_votes);
  });
};

// Get a single user_vote
exports.show = function(req, res) {
  UserVote.findById(req.params.id, function (err, user_vote) {
    if(err) { return handleError(res, err); }
    if(!user_vote) { return res.send(404); }
    return res.json(user_vote);
  });
};

exports.list = function(req, res){
  UserVote.find({userid: req.params.userid}, function (err, user_vote){
    if(err) { return handleError(res, err); }
    if(!user_vote) { return res.send(404); }
    return res.json(200, user_vote);
  })
};


// Creates a new user_vote in the DB.
exports.create = function(req, res) {
  UserVote.create(req.body, function(err, user_vote) {
    if(err) { return handleError(res, err); }
    return res.json(201, user_vote);
  });
};

// Updates an existing user_vote in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  UserVote.findById(req.params.id, function (err, user_vote) {
    if (err) { return handleError(res, err); }
    if(!user_vote) { return res.send(404); }
    var updated = _.merge(user_vote, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user_vote);
    });
  });
};

// Deletes a user_vote from the DB.
exports.destroy = function(req, res) {
  UserVote.findById(req.params.id, function (err, user_vote) {
    if(err) { return handleError(res, err); }
    if(!user_vote) { return res.send(404); }
    user_vote.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}