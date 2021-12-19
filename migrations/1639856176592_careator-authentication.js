/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('creator_authentications', {
        token: {
            type: 'text',
            notNull: true
        }
    });
    pgm.createTable('user_authentications', {
        token: {
            type: 'text',
            notNull: true
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('creator_authentications');
    pgm.dropTable('user_authentications');
};
