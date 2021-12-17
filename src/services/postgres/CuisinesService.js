const { Pool } = require('pg');

const NotFoundError = require('../../common/exceptions/NotFoundError');

class CuisinesService {
  constructor() {
    this._pool = new Pool();
  }

  async getAllCuisines() {
    const query = {
      text: 'SELECT * FROM cuisines',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getCuisineById(id) {
    const query = {
      text: 'SELECT * FROM cuisines WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (result.rows.length === 0) {
      throw new NotFoundError('Cuisine not found');
    }
    return result.rows[0];
  }

  async addNewCuisine(name) {
    const query = {
      text: 'INSERT INTO cuisines (name) VALUES ($1) RETURNING *',
      values: [name],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

module.exports = CuisinesService;
