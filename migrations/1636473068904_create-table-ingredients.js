/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
      pgm.createTable('ingredients', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: 'text',
      notNull: true,
    },
  });
};

exports.down = pgm => {};
