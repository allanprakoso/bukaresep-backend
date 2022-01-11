const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const NotFoundError = require('../../common/exceptions/NotFoundError');
const InvariantError = require('../../common/exceptions/InvariantError');
const AuthenticationError = require('../../common/exceptions/AuthenticationError');

class UsersService {
    constructor() {
        this.pool = new Pool();
    }

    async verifyNewUsername(username) {
        const query = {
            text: 'SELECT id FROM users WHERE username=$1',
            values: [username],
        };
        const result = await this.pool.query(query);
        if (result.rowCount > 0) {
            throw new InvariantError('Username already exists');
        }
    }

    async verifyNewEmail(email) {
        const query = {
            text: 'SELECT id FROM users WHERE email=$1',
            values: [email],
        };
        const result = await this.pool.query(query);
        if (result.rowCount > 0) {
            throw new InvariantError('Email already exists');
        }
    }

    async addUser({ username, password, email, gender, age, front_name, last_name, }) {
        await this.verifyNewUsername(username);
        await this.verifyNewEmail(email);
        const id = `${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO users (id, username, password, email, gender, age, front_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, username, hashedPassword, email, gender, age, front_name, last_name],
        }

        const result = await this.pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Failed to create new user');
        }
        return result.rows[0].id;
    }

    async updateUser(id, { username, email, gender, age, front_name, last_name, url_image }) {
        const query = {
            text: 'UPDATE users SET username = $1, email= $2, gender = $3, age= $4, front_name= $5, last_name = $6, url_image=$8 WHERE id = $7',
            values: [username, email, gender, age, front_name, last_name, id, url_image],
        }
        const result = await this.pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('Failed to update Creator');
        }
    }


    async getUserById(id) {
        const query = {
            text: 'SELECT id, username, email, gender, age, front_name, last_name FROM users WHERE id = $1',
            values: [id],
        }
        const result = await this.pool.query(query);
        if (!result.rows[0]) {
            throw new NotFoundError('User not found');
        }
        return result.rows[0];
    }

    async verifyUserCredentials(username, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE username=$1 OR email=$1',
            values: [username],
        };
        const result = await this.pool.query(query);
        if (result.rowCount === 0) {
            throw new NotFoundError('User not found');
        }
        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthenticationError('Invalid password');
        }
        return user.id;
    }
}

module.exports = UsersService;