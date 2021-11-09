/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // create table tags (id int autoincrement primarykey, title)
    pgm.createTable('tags', {
        id: {
            type: 'integer',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        title: {
            type: 'varchar(255)',
            notNull: true
        }
    });
};

exports.down = pgm => {};
