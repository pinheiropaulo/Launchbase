const db = require('../../config/db');

function find(filters, table) {
  let query = `SELECT * FROM ${table}`;

  if (filters) {
    Object.keys(filters).map((key) => {
      query += ` ${key}`;

      Object.keys(filters[key]).map((field) => {
        query += ` ${field} = '${filters[key][field]}'`;
      });
    });
  }

  return db.query(query);
}

const BaseModel = {
  init({ table }) {
    if (!table) {
      throw new Error('Invalid Params');
    }
    this.table = table;

    return this;
  },

  async find(id) {
    const results = await find({ where: { id } }, this.table);
    return results.rows[0];
  },

  async findOne(filters) {
    const results = await find(filters, this.table);
    return results.rows[0];
  },

  async findAll(filters) {
    const results = await find(filters, this.table);
    return results.rows;
  },

  async create(fields) {
    try {
      let keys = [];
      let values = [];

      Object.keys(fields).map((key) => {
        keys.push(key);
        values.push(`'${fields[key]}'`);
      });

      const query = `INSERT INTO ${this.table} (${keys.join(',')})
        VALUES (${values.join(',')})
      RETURNING id`;

      const result = await db.query(query);
      return result.rows[0].id;
      //
    } catch (error) {
      console.error(error);
    }
  },

  update(id, fields) {
    try {
      let update = [];

      Object.keys(fields).map((key) => {
        const line = `${key} = '${fields[key]}'`;
        update.push(line);
      });

      let query = `UPDATE ${this.table} SET
        ${update.join(',')} WHERE id = ${id}
      `;

      return db.query(query);
    } catch (error) {
      console.error(error);
    }
  },

  delete(id) {
    return db.query(`DELETE FROM ${this.table} WHERE id = ${id}`);
  },
};

module.exports = BaseModel;
