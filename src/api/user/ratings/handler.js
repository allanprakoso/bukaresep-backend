const autoBind = require('auto-bind');

class RatingHandler {
    constructor(service) {
        this.service = service;
        autoBind(this);
    }

    async createRatingHandler(request, h) {
        const rating = await this.service.createRatingRecipes(request.payload.rating, request.auth.credentials.id, request.params.recipeId);
        const response = h.response({
            status: 'success',
            message: 'ratings retrieved successfully',
            results: rating,
        });
        response.code(201);
        return response;
    }

    async getRatingRecipeUserHandler(request, h) {
        const rating = await this.service.getRatingRecipeUsers(request.auth.credentials.id, request.params.recipeId);
        const response = h.response({ rating });
        response.code(200);
        return response;
    }

    async updateRatingRecipeHandler(request, h) {
        const rating = await this.service.updateRatingRecipe(request.auth.credentials.id, request.params.recipeId, request.payload.rating);
        const response = h.response({ rating });
        response.code(200);
        return response;
    }

    async getRatingRecipeHandler(request, h) {
        const ratings = await this.service.getRatingRecipe(request.params.recipeId);
        const response = h.response({ ratings });
        response.code(200);
        return response;
    }
}

module.exports = RatingHandler;