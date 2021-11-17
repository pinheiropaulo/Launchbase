import db from '../../config/db';

export default {
  all() {
    return db.query(`SELECT * FROM categories`);
  },
};
