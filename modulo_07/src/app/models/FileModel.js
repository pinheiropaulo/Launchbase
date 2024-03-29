import fs from 'fs';
import db from '../../config/db';

export default {
  create(data) {
    const query = `
      INSERT INTO files (
        name,
        path,
        product_id
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [data.filename, data.path, data.product_id];

    return db.query(query, values);
  },

  async delete(id) {
    try {
      const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
      const file = result.rows[0];

      fs.unlinkSync(file.path);

      return db.query(`DELETE FROM files WHERE id = $1`, [id]);
    } catch (error) {
      console.error(error);
    }
  },
};
