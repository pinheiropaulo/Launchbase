import db from '../../config/db';

export default {
  async findOne(filters) {
    let query = 'SELECT * FROM users';

    Object.keys(filters).map((key) => {
      query = `${query} ${key}`;

      Object.keys(filters[key]).map((field) => {
        query = `${query} ${field}='${filters[key][field]}'`;
      });
    });

    const results = await db.query(query);
    return results.rows[0];
  },
};
