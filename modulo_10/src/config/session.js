import session from 'express-session';
import db from './db';
const pgSession = require('connect-pg-simple')(session);

export default session({
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
