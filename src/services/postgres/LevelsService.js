const { Pool } = require('pg');

const NotFoundError = require('../../common/exceptions/NotFoundError');

class LevelsService {
  constructor() {
    this._pool = new Pool();
  }

  async getAllLevels() {
    const query = {
      text: 'SELECT * FROM levels',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getLevelById(id) {
    const query = {
      text: 'SELECT * FROM levels WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (result.rowCount === 0) throw new NotFoundError('Level not found');
    return result.rows[0];
  }
}

module.exports = LevelsService;
