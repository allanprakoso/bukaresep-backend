const { Pool } = require('pg');

class CreatorsService {
    constructor() {
        this._pool = new Pool();
    }

    async verifyNewUsername(username) {
        const query = {
            text: 'SELECT id FROM creators WHERE username=$1',
            values =[username]
        };
        const result = await this._pool.query(query);
        if (result.rowCount > 0) {
            throw new InvariantError('Username already exists');
        }
    };

    async addCreator(username, password, email, gender, age, front_name, last_name) {
        await this.verifyNewUsername(username);
        const id = `${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO creators (id, username, password, email, gender, age, front_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, username, hashedPassword, email, gender, age, front_name, last_name],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('failed to create new creator')
        }
        return result.rows[0].id;
    }

    async getCreatorById(id) {
        const query = {
            text: 'SELECT * FROM creators WHERE id=$1',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (result.rowCount === 0) {
            throw new NotFoundError('Creator does not exist');
        }
        return result.rows[0];
    }

    async verifyCreatorCredentials(username, password) {
        const query = {
            text: 'SELECT * FROM creators WHERE username=$1',
            values: [username]
        }
        const result = await this._pool.query(query);
        if (result.rowCount === 0) {
            throw new AuthenticationError('Creator does not exist');
        }
        const hashedPassword = result.rows[0].password;
        const isValid = await bcrypt.compare(password, hashedPassword);
        if (!isValid) {
            throw new AuthenticationError('Invalid password');
        }
        return result.rows[0].id;
    }
}

module.exports = CreatorsService;