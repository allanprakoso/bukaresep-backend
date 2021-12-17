/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // create table recipe_tags (recipe_id references recipes, tag_id reference tags)
    pgm.createTable('recipe_tags', {
        recipe_id: {
            type: 'int',
            references: 'recipes',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            notNull: true
        },
        tag_id: {
            type: 'int',
            references: 'tags',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
    });
};

exports.down = pgm => {
    // drop table recipe_tags
    pgm.dropTable('recipe_tags');
};
