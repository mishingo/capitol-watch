/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ubill = require('./ubill.model');

exports.register = function(socket) {
  ubill.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ubill.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ubill:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ubill:remove', doc);
}