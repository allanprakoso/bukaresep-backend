/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('creators', {
        id: {
            type: 'VARCHAR(50)',
            notNull: true,
            primaryKey: true,
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true,
        },
        email: {
            type: 'TEXT',
            notNull: true,
            unique: true,
        },
        gender: {
            type: 'CHAR(1)',
        },
        password: {
            type: 'TEXT',
            notNull: true,
        },
        age: {
            type: 'SMALLINT',
        },
        front_name: {
            type: 'VARCHAR(50)',
        },
        last_name: {
            type: 'VARCHAR(50)',
        },
        url_image: {
            type: 'TEXT',
        }

    });
};

exports.down = pgm => {
    pgm.dropTable('creators');
};
