import db from './db';
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

module.exports = session({
  store: new pgSession({
    pool: db,
  }),
  secret: process.env.SESSION_SECRET,
  reseva: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
});
