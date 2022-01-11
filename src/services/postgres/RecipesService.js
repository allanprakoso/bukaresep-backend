const { Pool } = require('pg');

const NotFoundError = require('../../common/exceptions/NotFoundError');
const InvariantError = require('../../common/exceptions/InvariantError');
const LevelsService = require('./LevelsService');
const CategoriesService = require('./CategoriesService');
const CuisinesService = require('./CuisinesService');
const UnitService = require('./UnitService');

class RecipesService {
    constructor() {
        this._pool = new Pool();
        this.levelsService = new LevelsService();
        this.categoriesService = new CategoriesService();
        this.cuisinesService = new CuisinesService();
        this.unitService = new UnitService();
    }
    //? Create Recipe 

    async addRecipe(idCreator, payload) {
        const {
            name,
            url_image,
            group_ingredients,
            instructions,
            cooking_time,
            category_id,
            serving,
            cuisine_id,
            level_id,
            tags,
            status,
        } = payload;
        const created_at = new Date();
        const updated_at = created_at;
        const query = {
            text: 'INSERT INTO recipes (creator_id,name,url_image,cooking_time,category_id,serving,cuisine_id,level_id,created_at,updated_at,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning id',
            values: [idCreator, name, url_image, cooking_time, category_id, serving, cuisine_id, level_id, created_at, updated_at, status],
        };
        const result = await this._pool.query(query);

        const recipe_id = result.rows[0].id;

        for (const data of group_ingredients) {
            const grup = data.group;
            const group_id = await this.addGroupIngredients(recipe_id, grup);
            for (const ingredient of data.ingredients) {
                await this.addRecipeIngredient(group_id, ingredient);
            }
        }

        for (const instruction of instructions) {
            await this.addRecipeInstruction(recipe_id, instruction);
        }

        for (const tag of tags) {
            await this.addRecipeTag(recipe_id, tag);
        }

        return result.rows[0].id;
    }

    async addGroupIngredients(recipe_id, name) {
        const query = {
            text: 'INSERT INTO group_ingredients (recipe_id,name) VALUES ($1,$2) returning id',
            values: [recipe_id, name],
        };
        const result = await this._pool.query(query);
        return result.rows[0].id;
    }

    async addRecipeIngredient(group_id, {
        name, unit_id, amount, description,
    }) {
        const query = {
            text: 'INSERT INTO recipe_ingredients (group_id,name,unit_id,amount,description) VALUES ($1,$2,$3,$4,$5)',
            values: [group_id, name, unit_id, amount, description],
        };
        await this._pool.query(query);
    }

    async addTag(tag) {
        const query = {
            text: 'INSERT INTO tags (title) VALUES ($1) returning id',
            values: [tag],
        };
        const result = await this._pool.query(query);
        return result.rows[0].id;
    }

    async addRecipeTag(recipe_id, tag) {
        const tag_id = await this.addTag(tag);
        const query = {
            text: 'INSERT INTO recipe_tags (recipe_id,tag_id) VALUES ($1,$2)',
            values: [recipe_id, tag_id],
        };
        await this._pool.query(query);
    }

    async addRecipeInstruction(recipe_id, {
        step, instruction, url_image, url_video,
    }) {
        const query = {
            text: 'INSERT INTO instructions (recipe_id,step,instruction,url_image,url_video) VALUES ($1,$2,$3,$4,$5)',
            values: [recipe_id, step, instruction, url_image, url_video],
        };
        await this._pool.query(query);
    }

    //? Read Recipe
    async verifyRecipeOwner(recipe_id, user_id) {
        const query = {
            text: 'SELECT * FROM recipes WHERE id = $1 AND creator_id = $2',
            values: [recipe_id, user_id],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('invalid recipe owner');
        }
    }

    async getRecipesPagination(creator_id) {
        const query = {
            text: 'SELECT recipes.id, recipes.name AS name, recipes.url_image AS image, creators.username AS creator, categories.name AS category, levels.name AS level, cuisines.name AS cuisine, created_at, updated_at FROM recipes  INNER JOIN categories ON recipes.category_id=categories .id INNER JOIN cuisines ON recipes.cuisine_id=cuisines.id INNER JOIN levels ON recipes.level_id=levels.id INNER JOIN creators ON recipes.creator_id=creators.id WHERE creator_id = $1 AND status=\'published\' ORDER BY created_at DESC',
            values: [creator_id],
        };
        const result = await this._pool.query(query);
        if (result.rows.length <= 0) {
            throw new NotFoundError('Recipes not found');
        }
        return result.rows;
    }

    async getRecipesDrafted(creator_id) {
        const query = {
            text: 'SELECT recipes.id, recipes.name AS name, recipes.url_image AS image, creators.username AS creator, categories.name AS category, levels.name AS level, cuisines.name AS cuisine, created_at, updated_at FROM recipes  INNER JOIN categories ON recipes.category_id=categories .id INNER JOIN cuisines ON recipes.cuisine_id=cuisines.id INNER JOIN levels ON recipes.level_id=levels.id INNER JOIN creators ON recipes.creator_id=creators.id WHERE creator_id = $1 AND status=\'drafted\' ORDER BY created_at',
            values: [creator_id],
        };
        const result = await this._pool.query(query);
        if (result.rows.length <= 0) {
            throw new NotFoundError('Recipes not found');
        }
        return result.rows;
    }

    async getRecipeById(id) {
        const recipeDetails = ({ id, name, url_image, cooking_time, serving, created_at, updated_at, status, creator }, group_ingredients, instructions, category, cuisine, level, tags) => ({
            id, name, url_image, created_at, creator, updated_at, status, group_ingredients, instructions, cooking_time, serving, category, cuisine, level, tags
        });

        const query = {
            text: 'SELECT category_id, cuisine_id, level_id, recipes.id as id, recipes.name as name, recipes.url_image as url_image, cooking_time, serving, created_at, updated_at, status, creators.username as creator FROM recipes INNER JOIN creators ON recipes.creator_id = creators.id WHERE recipes.id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (result.rows.length === 0) {
            throw new NotFoundError('Recipe not found');
        }
        const group_ingredients = await this.getGroupIngredients(id);
        const instructions = await this.getRecipeInstructions(id);
        const category = await this.categoriesService.getCategoryById(result.rows[0].category_id);
        const cuisine = await this.cuisinesService.getCuisineById(result.rows[0].cuisine_id);
        const level = await this.levelsService.getLevelById(result.rows[0].level_id);
        const tags = await this.getRecipeTags(id);
        const recipe = recipeDetails(result.rows[0], group_ingredients, instructions, category, cuisine, level, tags);
        return recipe;
    }

    async getGroupIngredients(recipe_id) {
        const query = {
            text: 'SELECT * FROM group_ingredients WHERE recipe_id = $1',
            values: [recipe_id],
        };
        var _ingredients = [];
        const result = await this._pool.query(query);
        for (const data of result.rows) {
            const group_id = data.id;
            const ingredients = await this.getRecipeIngredients(group_id);
            _ingredients.push({ id: group_id, group: data.name, ingredients: ingredients });
        }
        return _ingredients;
    }

    async getRecipeIngredients(group_id) {
        const query = {
            text: 'SELECT * FROM recipe_ingredients WHERE group_id = $1',
            values: [group_id],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async getRecipeInstructions(recipe_id) {
        const query = {
            text: 'SELECT * FROM instructions WHERE recipe_id = $1',
            values: [recipe_id],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async getRecipeTags(recipe_id) {
        const query = {
            text: 'SELECT tag_id as id, title as tag FROM recipe_tags INNER JOIN tags ON tag_id = tags.id WHERE recipe_id = $1;',
            values: [recipe_id],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    //? Update Recipe

    async updateRecipe(creator_id, recipe, recipe_id) {
        await this.verifyRecipeOwner(recipe_id, creator_id);
        const updated_at = new Date();
        const { group_ingredients, instructions, tags } = recipe;

        const queryRecipe = {
            text: 'UPDATE recipes SET name = $1, url_image = $2, cooking_time = $3, serving = $4, updated_at = $5, category_id=$6, cuisine_id=$7,level_id=$8 WHERE id = $9',
            values: [recipe.name, recipe.url_image, recipe.cooking_time, recipe.serving, updated_at, recipe.category_id, recipe.cuisine_id, recipe.level_id, recipe_id],
        };
        await this._pool.query(queryRecipe);

        for (const group of group_ingredients) {
            const queryGroup = {
                text: 'UPDATE group_ingredients SET name = $1 WHERE id=$2',
                values: [group.group, group.id]
            };
            await this._pool.query(queryGroup);
            for (const ingredient of group.ingredients) {
                const queryIngredient = {
                    text: 'UPDATE recipe_ingredients SET name = $1, unit_id = $2, amount = $3, description = $4 WHERE id = $5',
                    values: [ingredient.name, ingredient.unit_id, ingredient.amount, ingredient.description, ingredient.id]
                };
                await this._pool.query(queryIngredient);
            }
        }

        for (const instruction of instructions) {
            const queryInstruction = {
                text: 'UPDATE instructions SET step = $1, instruction = $2, url_image = $3, url_video = $4 WHERE id = $5',
                values: [instruction.step, instruction.instruction, instruction.url_image, instruction.url_video, instruction.id]
            };
            await this._pool.query(queryInstruction);
        }
    }
    async updateStatusRecipe(creator_id, { id, status }) {
        await this.verifyRecipeOwner(id, creator_id);
        const updated_at = new Date();
        const query = {
            text: 'UPDATE recipes SET status = $1, updated_at = $2 WHERE id = $3',
            values: [status, updated_at, id],
        };
        await this._pool.query(query);
    }

    //? Delete Recipe
    async deleteRecipe(creator_id, id) {
        await this.verifyRecipeOwner(id, creator_id);
        const query = {
            text: 'DELETE FROM recipes WHERE id = $1',
            values: [id],
        };
        await this._pool.query(query);
    }

    async filteringRecipe(creator_id, { keyword, category, level, time }) {
        var addtionalQuery = '';
        const qCategory = ' AND category_id=' + category + ' ';
        const qLevel = 'AND level_id=' + level + ' ';
        const qCooking = 'AND cooking_time<=' + time + ' ';
        if (category !== undefined) addtionalQuery += qCategory;
        if (level !== undefined) addaddtionalQuery += qLevel;
        if (time !== undefined) addtionalQuery += qCooking;

        const query = {
            text: `SELECT * FROM recipes WHERE creator_id=$1 AND name ILIKE '%' || $2 || '%' ${addtionalQuery}`,
            values: [creator_id, keyword],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
    //? Recipe User

    async getRecipesUsers({ page = 1 }) {
        const limit = 20;
        const query = {
            text: 'SELECT recipes.id, cooking_time, level_id, recipes.name AS name, recipes.url_image AS image, creators.username AS creator, categories.name AS category, levels.name AS level, cuisines.name AS cuisine, created_at, updated_at FROM recipes  INNER JOIN categories ON recipes.category_id=categories.id INNER JOIN cuisines ON recipes.cuisine_id=cuisines.id INNER JOIN levels ON recipes.level_id=levels.id INNER JOIN creators ON recipes.creator_id=creators.id WHERE status=\'published\' ORDER BY created_at ASC LIMIT $1 OFFSET $2',
            values: [limit, (page - 1) * limit],
        };
        const result = await this._pool.query(query);
        if (result.rows.length <= 0) {
            throw new NotFoundError('Recipes not found');
        }
        return result.rows;
    }

    async userFilteringRecipe({ keyword, category, level, time }) {
        var addtionalQuery = '';
        const qCategory = ' AND category_id=' + category + ' ';
        const qLevel = 'AND level_id=' + level + ' ';
        const qCooking = 'AND cooking_time<=' + time + ' ';
        if (category !== undefined) addtionalQuery += qCategory;
        if (level !== undefined) addaddtionalQuery += qLevel;
        if (time !== undefined) addtionalQuery += qCooking;

        const query = {
            text: `SELECT recipes.id, cooking_time, level_id, recipes.name AS name, recipes.url_image AS image, creators.username AS creator, categories.name AS category, levels.name AS level, created_at, updated_at FROM recipes  INNER JOIN categories ON recipes.category_id=categories.id INNER JOIN cuisines ON recipes.cuisine_id=cuisines.id INNER JOIN levels ON recipes.level_id=levels.id INNER JOIN creators ON recipes.creator_id=creators.id WHERE recipes.name ILIKE '%' || $1 || '%' ${addtionalQuery}`,
            values: [keyword],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = RecipesService;
