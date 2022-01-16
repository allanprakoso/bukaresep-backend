const { Pool } = require('pg');
const NotFoundError = require('../../common/exceptions/NotFoundError');
const InvariantError = require('../../common/exceptions/InvariantError');

class RatingsService {
    constructor() {
        this._pool = new Pool();
    }

    async createRatingRecipes(rating, user_id, recipe_id) {
        const query = {
            text: 'INSERT INTO ratings (rating, user_id, recipe_id) VALUES ($1, $2, $3) RETURNING *',
            values: [rating, user_id, recipe_id],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0]) {
            throw new InvariantError('Failed to create new rating');
        }
        return result.rows[0];
    }

    async getRatingRecipeUsers(user_id, recipe_id) {
        const query = {
            text: 'SELECT * FROM ratings WHERE user_id = $1 AND recipe_id = $2',
            values: [user_id, recipe_id],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0]) {
            throw new NotFoundError('Rating not found');
        }
        return result.rows[0];
    }

    async updateRatingRecipe(user_id, recipe_id, rating) {
        const query = {
            text: 'UPDATE ratings SET rating = $1 WHERE user_id = $2 AND recipe_id = $3 returning *',
            values: [rating, user_id, recipe_id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Failed to update rating');
        }
        return result.rows[0];
    }

    async getRatingRecipe(recipe_id) {
        const query = {
            text: 'SELECT AVG(rating) AS rating FROM ratings WHERE recipe_id = $1',
            values: [recipe_id],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0]) {
            throw new NotFoundError('Rating not found');
        }
        return result.rows[0];
    }
}

module.exports = RatingsService;