/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('recipe_ingredients', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        group_id: {
            type: 'INTEGER',
            references: 'group_ingredients',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        name: { type: 'text', notNull: true },
        description: { type: 'text', notNull: false },
        amount: {
            type: 'float',
            notNull: true
        },
        unit_id: {
            type: 'int',
            references: 'unit',
            onDelete: 'SET NULL'
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('recipe_ingredients');
};
