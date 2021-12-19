const { Pool } = require('pg');
const InvariantError = require('../../common/exceptions/InvariantError');

class CreatorAuthenticationService {
    constructor() {
        this.pool = new Pool();
    }

    async addRefreshToken(token) {
        const query = {
            text: 'INSERT INTO creator_authentications(token) VALUES($1) returning token',
            values: [token]
        }
        const result = await this.pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('Could not add refresh token');
        }
    }

    async verifyRefreshToken(refreshToken) {
        const query = {
            text: 'SELECT * FROM creator_authentications WHERE token = $1',
            values: [refreshToken]
        }
        const result = await this.pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('Refresh Token not valid');
        }
    }  

    async deleteRefreshToken(token) {
        await this.verifyRefreshToken(token)
        const query = {
            text: 'DELETE FROM creator_authentications WHERE token = $1',
            values: [token]
        }
        const result = await this.pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('Could not delete refresh token');
        }
    }

}

module.exports = CreatorAuthenticationService;