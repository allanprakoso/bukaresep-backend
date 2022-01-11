const { Pool } = require('pg');

const NotFoundError = require('../../common/exceptions/NotFoundError');
const InvariantError = require('../../common/exceptions/InvariantError');
const AuthenticationError = require('../../common/exceptions/AuthenticationError');

const RecipeService = require('./RecipesService');
class CreatorCollectionService {
    constructor() {
        this._pool = new Pool();
        this.recipeService = new RecipeService();
    }

    async verifyCollectionsOwner({ creator_id, collection_id }) {
        const query = {
            text: 'SELECT id FROM creator_collections WHERE id = $1 AND creator_id = $2',
            values: [collection_id, creator_id],
        };
        const result = await this._pool.query(query);
        if (!result.rows[0]) {
            throw new AuthenticationError('You are not the owner of this collection');
        }
    }

    async addCollection(creator_id, { name }) {
        const query = {
            text: 'INSERT INTO creator_collections (name, creator_id) VALUES ($1, $2) RETURNING id',
            values: [name, creator_id],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Failed to create new collection');
        }
        return result.rows[0].id;
    }

    async updateCollection({ collection_id, creator_id }, { name }) {
        await this.verifyCollectionsOwner({ creator_id, collection_id });
        const query = {
            text: 'UPDATE creator_collections SET name = $1 WHERE id = $2 returning *',
            values: [name, collection_id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Failed to update collection');
        }
        return result.rows[0];
    }

    async getCollectionById(id) {
        const query = {
            text: 'SELECT * FROM creator_collections WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0]) {
            throw new NotFoundError('Collection not found');
        }
        return result.rows[0];
    }

    async getCollections(creator_id) {
        const query = {
            text: `SELECT t.id ,t.collection AS name, (SELECT ARRAY (SELECT url_image from items_creator_collection INNER JOIN recipes ON recipe_id = recipes.id WHERE creator_collection_id=t.id LIMIT 3)) AS images, array_agg(t.category) AS categories, array_agg(t.row_count) count FROM (SELECT creator_collections.id, creator_collections.name as collection, categories.name as category, COUNT(recipes.id) AS row_count FROM creator_collections INNER JOIN items_creator_collection ON creator_collection_id = creator_collections.id INNER JOIN recipes ON recipes.id = recipe_id INNER JOIN categories ON category_id = categories.id WHERE creator_collections.creator_id=$1 GROUP BY collection, category, creator_collections.id) t GROUP BY t.collection, t.id`,
            values: [creator_id],
        }
        const result = await this._pool.query(query);

        const collectionModel = ({ id, name, images }, categories) => ({
            id, name, images, categories
        });
        let collections = [];
        result.rows.forEach(collection => {
            let categories = [];
            collection.categories.forEach((key, i) => {
                categories.push({ name: key, count: +collection.count[i] })
            }
            )
            collections.push(collectionModel(collection, categories));
        })

        return collections;
    }

    async getCollectionsName() {
        const query = {
            text: 'SELECT id,name FROM creator_collections',
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async deleteCollection(collection_id, creator_id) {
        await this.verifyCollectionsOwner({ creator_id, collection_id });
        const query = {
            text: 'DELETE FROM creator_collections WHERE id = $1',
            values: [collection_id],
        };

        const result = await this._pool.query(query);
        if (result.rows.length) {
            throw new InvariantError('Failed to delete collection');
        }
    }

    async verifyNewCollectionRecipe(collection_id, recipe_id) {
        const query = {
            text: 'SELECT * FROM items_creator_collection WHERE creator_collection_id = $1 AND recipe_id = $2',
            values: [collection_id, recipe_id],
        };
        const result = await this._pool.query(query);
        if (result.rows.length > 0) {
            throw new InvariantError('Failed to add recipe to collection');
        }
    }

    async addRecipeToCollection({ collection_id, recipe_id, creator_id }) {
        await this.verifyCollectionsOwner({ creator_id, collection_id });
        await this.verifyNewCollectionRecipe(collection_id, recipe_id);
        await this.recipeService.verifyRecipeOwner(recipe_id, creator_id);
        const query = {
            text: 'INSERT INTO items_creator_collection (creator_collection_id, recipe_id) VALUES ($1, $2) returning *',
            values: [collection_id, recipe_id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Failed to add recipe to collection');
        }
    }

    async removeRecipeFromCollection({ collection_id, recipe_id, creator_id }) {
        await this.verifyCollectionsOwner({ creator_id, collection_id });
        const query = {
            text: 'DELETE FROM items_creator_collection WHERE creator_collection_id = $1 AND recipe_id = $2',
            values: [collection_id, recipe_id],
        };
        const result = await this._pool.query(query);
        if (result.rows.length) {
            throw new InvariantError('Failed to remove recipe from collection');
        }
    }

    async getRecipesByCollectionId(id) {
        const query = {
            text: 'SELECT recipes.name AS name, recipes.url_image AS image, creators.username AS creator, categories.name AS category, levels.name AS level, cuisines.name AS cuisine, created_at, updated_at FROM items_creator_collection INNER JOIN recipes ON items_creator_collection.recipe_id=recipes.id INNER JOIN categories ON recipes.category_id=categories.id INNER JOIN cuisines ON recipes.cuisine_id=cuisines.id INNER JOIN levels ON recipes.level_id=levels.id INNER JOIN creators ON recipes.creator_id=creators.id WHERE creator_collection_id = $1 ORDER BY created_at DESC',
            values: [id],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = CreatorCollectionService;
