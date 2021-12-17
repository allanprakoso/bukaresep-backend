/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('group_ingredients', {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true,
        },
        recipe_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'recipes',
            onDelete: 'CASCADE',
            
        },
        name: { type: 'text', notNull: true, default: 'Bahan Utama' }
    })
};

exports.down = pgm => {
    pgm.dropTable('group_ingredients');
};

