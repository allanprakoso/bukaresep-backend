/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('items_creator_collection', {
        recipe_id: {
        type: 'int',
        notNull: true,
        references: 'recipes',
        onDelete: 'cascade'
        },
        creator_collection_id: {
        type: 'int',
        notNull: true,
        references: 'creator_collections',
        onDelete: 'cascade'
        }
    });
};

exports.down = pgm => {};
