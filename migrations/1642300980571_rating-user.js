/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('ratings', {
        id: {
            type: 'serial',
            notNull: true,
            primaryKey: true,
        },
        user_id: {
            type: 'varchar(50)',
            references: 'users',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        recipe_id: {
            type: 'int',
            notNull: true,
            references: 'recipes',
            onDelete: 'cascade'
        },
        rating: {
            type: 'integer',
            notNull: true,
        },
    });
};

exports.down = pgm => { };
