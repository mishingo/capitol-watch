'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UbillSchema = new Schema({
  guid: Number,
  bill_number: Number,
  vote: String
});

module.exports = mongoose.model('Ubill', UbillSchema);