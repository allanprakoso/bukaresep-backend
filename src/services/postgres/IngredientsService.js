const { Pool } = require('pg');

const NotFoundError = require('../../common/exceptions/NotFoundError');

class IngredientsService {
  constructor() {
    this._pool = new Pool();
  }

  async getAllIngredients() {
    const query = {
      text: 'SELECT * FROM ingredients',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getIngredientById(id) {
    const query = {
      text: 'SELECT * FROM ingredients WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (result.rowCount === 0) throw new NotFoundError('Ingredient not found');
    return result.rows[0];
  }
}
module.exports = IngredientsService;
