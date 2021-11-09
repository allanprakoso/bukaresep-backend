/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('categories', {
        id: {
            type: 'int',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        name: {
            type: 'varchar(255)',
            notNull: true,
            unique: true,
        },
    });
};

exports.down = pgm => {};
