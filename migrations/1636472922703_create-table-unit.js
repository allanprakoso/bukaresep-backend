/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    //create table unit (id int primarykey autoIncrement, unit varchar(50);
    pgm.createTable('unit', {
        id: {
            type: 'SERIAL',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        unit: {
            type: 'varchar(50)',
            unique: true,
            notNull: true
        }});   
};

exports.down = pgm => {
    pgm.dropTable('unit');
};
