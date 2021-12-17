/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // create table instructions (id int primarykey autoIncrement, step text, instruction text, url_image text null, url_video text null)
    pgm.createTable('instructions', {
        id: {
            type: 'SERIAL',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        recipe_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'recipes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        step: {
            type: 'text',
            notNull: true
        },
        instruction: {
            type: 'text',
            notNull: true
        },
        url_image: {
            type: 'text',
            notNull: false
        },
        url_video: {
            type: 'text',
            notNull: false
        }
    });
};

exports.down = pgm => {
    // drop table instructions
    pgm.dropTable('instructions');
};
