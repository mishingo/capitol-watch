'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VotesSchema = new Schema({
  userid: String,
  vote:[
  	{
  		bill_id: String,
  		vote_stance: String,
  	}
  ]
});

module.exports = mongoose.model('Votes', VotesSchema);