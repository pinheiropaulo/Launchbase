import db from '../../config/db';

module.exports = {
  all() {
    return db.query(`SELECT * FROM categories`);
  },
};
