/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // create table recipe_instructions (recipe_id int references recipes, instructions_id int references instructions)
    pgm.createTable('recipe_instructions', {
        recipe_id: {
            type: 'integer',
            references: 'recipes',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        instructions_id: {
            type: 'integer',
            references: 'instructions',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        }
    });
};

exports.down = pgm => {};
