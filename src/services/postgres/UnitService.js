const { Pool } = require('pg');

const NotFoundError = require('../../common/exceptions/NotFoundError');

class UnitService {
  constructor() {
    this._pool = new Pool();
  }

  async getAllUnit() {
    const query = {
      text: 'SELECT * FROM Unit',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getUnitById(id) {
    const query = {
      text: 'SELECT * FROM Unit WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (result.rowCount === 0) throw new NotFoundError('unit not found');
    return result.rows[0];
  }
}

module.exports = UnitService;
