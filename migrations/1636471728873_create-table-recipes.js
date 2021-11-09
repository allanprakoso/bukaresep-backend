/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('recipes', {
        id: {
            type: 'int',
            notNull: true,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        creator_id: {
            type: 'varchar(50)',
            notNull: true,
            references: 'creators',
            onDelete: 'cascade',
        },
        category_id: {
            type: 'int',
            notNull: true,
            references: 'categories',
            onDelete: 'cascade',
        },
        cuisine_id: {
            type: 'int',
            notNull: true,
            references: 'cuisines',
            onDelete: 'cascade',
        },
        level_id: {
            type: 'int',
            notNull: true,
            references: 'levels',
            onDelete: 'cascade',
        },
        name: {
            type: 'text',
            notNull: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
        },
        published_at: {
            type: 'timestamp',
        },
        url_image: {
            type: 'text',
        },
        cooking_time: {
            type: 'smallint',
        },
        serving: {
            type: 'smallint',
        },
    });
};

exports.down = pgm => { };
