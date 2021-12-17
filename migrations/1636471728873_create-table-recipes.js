/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('recipes', {
        id: {
            type: 'SERIAL',
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        creator_id: {
            type: 'varchar(50)',
            notNull: true,
            references: 'creators',
            onDelete: 'cascade',
        },
        category_id: {
            type: 'SERIAL',
            notNull: true,
            references: 'categories',
            onDelete: 'cascade',
        },
        cuisine_id: {
            type: 'SERIAL',
            notNull: true,
            references: 'cuisines',
            onDelete: 'cascade',
        },
        level_id: {
            type: 'SERIAL',
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
        status: {
            type: 'varchar(20)',
            notNull: true,
            default: 'drafted',
            check: 'status IN (\'drafted\', \'published\', \'archived\', \'deleted\')',
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

exports.down = pgm => {
    pgm.dropTable('recipes');
 };
