/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('user_collections', {
        id: {
            type: 'SERIAL',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        user_id: {
            type: 'varchar(50)',
            references: 'users',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        name: {
            type: 'text',
        },
    });
};

exports.down = pgm => {};
