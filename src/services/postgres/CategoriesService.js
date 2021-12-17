const { Pool } = require('pg');
const NotFoundError = require('../../common/exceptions/NotFoundError');

class CategoriesService {
  constructor() {
    this.pool = new Pool();
  }

  async getAllCategories() {
    const query = {
      text: 'SELECT * FROM categories',
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (result.rowCount === 0) {
      throw new NotFoundError('Category not found');
    }
    return result.rows[0];
  }
}

module.exports = CategoriesService;
