/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // create table instructions (id int primarykey autoIncrement, step text, instruction text, url_image text null, url_video text null)
    pgm.createTable('instructions', {
        id: {
            type: 'integer',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
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

exports.down = pgm => {};
