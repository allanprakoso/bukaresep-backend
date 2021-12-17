/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('levels', {
        id: {
            type: 'SERIAL',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        name: {
            type: 'varchar(50)',
            notNull: true,
            unique: true,
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('levels');
};
