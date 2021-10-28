import { db } from '../../config/db';

export class CategoryModel {
  all() {
    return db.query(`SELECT * FROM categories`);
  }
}
