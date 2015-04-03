/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Ubill = require('./ubill.model');

// Get list of things
exports.index = function(req, res) {
  Ubill.find(function (err, ubills) {
    if(err) { return handleError(res, err); }
    return res.json(200, ubills);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Ubill.findById(req.params.id, function (err, ubill) {
    if(err) { return handleError(res, err); }
    if(!ubill) { return res.send(404); }
    return res.json(ubill);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Ubill.create(req.body, function(err, ubill) {
    if(err) { return handleError(res, err); }
    return res.json(201, ubill);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ubill.findById(req.params.id, function (err, ubill) {
    if (err) { return handleError(res, err); }
    if(!ubill) { return res.send(404); }
    var updated = _.merge(ubill, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ubill);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Ubill.findById(req.params.id, function (err, ubill) {
    if(err) { return handleError(res, err); }
    if(!ubill) { return res.send(404); }
    ubill.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}