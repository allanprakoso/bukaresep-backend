const autoBind = require('auto-bind');

class RecipeHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async createRecipeHandler(request, h) {
    const idCreator = 'LIylAM7Pgkdf358w';
    const recipe_id = await this.service.addRecipe(idCreator, request.payload);
    const response = h.response({
      status: 'success',
      message: 'recipe created successfully',
      data: { recipe_id },
    });
    response.code(201);
    return response;
  }

  async getRecipeById(request, h){
    const recipe = await this.service.getRecipeById(request.params.id);
    const response = h.response({recipe});
    response.code(200);
    return response;
  }

  async updateRecipeById(request, h){
    await this.service.updateRecipe(request.payload);
    const response = h.response({
      status: 'success',
      message: 'recipe updated successfully',
    });
    response.code(200);
    return response;
  }

  async deleteRecipeById(request, h){
    await this.service.deleteRecipe(request.params.id);
    const response = h.response({
      status: 'success',
      message: 'recipe deleted successfully',
    });
    response.code(200);
    return response;
  }
}

module.exports = RecipeHandler;
