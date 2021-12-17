/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // create table creator_collections (id int, creator_id varchar(50) references creators, name text);
    pgm.createTable('creator_collections', {
        id: {
            type: 'SERIAL',
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        creator_id: {
            type: 'varchar(50)',
            references: 'creators',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        name: {
            type: 'text',
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('creator_collections');
};
