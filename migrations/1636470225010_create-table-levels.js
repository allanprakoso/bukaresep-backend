/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('levels', {
        id: {
            type: 'integer',
            primaryKey: true,
            notNull: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: 'varchar(50)',
            notNull: true
        }
    });
};

exports.down = pgm => {};
