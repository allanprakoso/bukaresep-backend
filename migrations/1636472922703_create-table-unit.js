/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    //create table unit (id int primarykey autoIncrement, unit varchar(50);
    pgm.createTable('unit', {
        id: {
            type: 'integer',
            primaryKey: true,
            notNull: true,
            unique: true,
            autoIncrement: true
        },
        unit: {
            type: 'varchar(50)',
            notNull: true
        }});   
};

exports.down = pgm => {};
