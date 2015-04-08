/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var UserVote = require('./user_vote.model');

exports.register = function(socket) {
  UserVote.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  UserVote.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('user_vote:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('user_vote:remove', doc);
}