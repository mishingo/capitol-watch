'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "capitolwatch-secret",

  TWITTER_ID: 'sBvhh82zt3C2O9dL5sCRZ6Fil',
  TWITTER_SECRET: 'xKD4o4jHIqQlL5QSIFJtbR4h1PejXeZhGL27agLDMUxocG2k3M',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
