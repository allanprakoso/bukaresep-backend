const autoBind = require('auto-bind');

class RecipeHandler {
    constructor(service) {
        this.service = service;
        autoBind(this);
    }

    async getRecipesHandler(request, h) {
        const recipes = await this.service.getRecipesUsers(request.query);
        const response = h.response({
            status: 'success',
            message: 'recipes retrieved successfully',
            page: request.query.page ?? 1,
            results: recipes,
        });
        response.code(200);
        return response;
    }

    async getRecipeByIdHandler(request, h) {
        const recipe = await this.service.getRecipeById(request.params.id);
        const response = h.response({ recipe });
        response.code(200);
        return response;
    }
    async filteringRecipesHandler(request, h) { 
        const recipes = await this.service.userFilteringRecipe(request.query);
        const response = h.response({
            status: 'success',
            message: 'recipes retrieved successfully',
            results: recipes,
        });
        response.code(200);
        return response;
    }
}

module.exports = RecipeHandler;