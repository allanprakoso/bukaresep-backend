/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('items_user_collection', {
        recipe_id: {
            type: 'int',
            notNull: true,
            references: 'recipes',
            onDelete: 'cascade'
        },
        user_collection_id: {
            type: 'int',
            notNull: true,
            references: 'user_collections',
            onDelete: 'cascade'
        }
    });
};

exports.down = pgm => { };
