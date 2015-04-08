'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserVoteSchema = new Schema({
  	userid: String,
  	billid: String,
  	stance: String
});

module.exports = mongoose.model('UserVote', UserVoteSchema);