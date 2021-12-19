const autoBind = require('auto-bind');

class RecipeHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async createRecipeHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const recipe_id = await this.service.addRecipe(credentialId, request.payload);
    const response = h.response({
      status: 'success',
      message: 'recipe created successfully',
      data: { recipe_id },
    });
    response.code(201);
    return response;
  }

  async getRecipeById(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const recipe = await this.service.getRecipeById(credentialId,request.params.id);
    const response = h.response({ recipe });
    response.code(200);
    return response;
  }

  async updateRecipeById(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const recipe_id = request.params.id;

    await this.service.updateRecipe(credentialId,request.payload, recipe_id);
    const response = h.response({
      status: 'success',
      message: 'recipe updated successfully',
    });
    response.code(200);
    return response;
  }

  async deleteRecipeById(request, h) {
    const { id: credentialId } = request.auth.credentials;
    await this.service.deleteRecipe(credentialId,request.params.id);
    const response = h.response({
      status: 'success',
      message: 'recipe deleted successfully',
    });
    response.code(200);
    return response;
  }

  async getAllRecipesPagination(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const recipes = await this.service.getRecipesPagination(credentialId,request.query);
    const response = h.response({
      status: 'success',
      message: 'recipes retrieved successfully',
      page: request.query.page ?? 1,
      results: recipes,
    });
    response.code(200);
    return response;
  }

  async searchRecipes(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const recipes = await this.service.filteringRecipe(credentialId,request.query);
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
