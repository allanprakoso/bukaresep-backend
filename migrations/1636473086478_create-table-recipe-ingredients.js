/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('recipe_ingredients', {
        recipe_id: {
            type: 'integer',
            notNull: true
        },
        ingredient_id: {
            type: 'integer',
            notNull: true
        },
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

exports.down = pgm => { };
