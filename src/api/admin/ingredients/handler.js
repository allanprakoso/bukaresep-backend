const autoBind = require('auto-bind');

class IngredientHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getAllIngredients(request, h) {
    const ingredients = await this.service.getAllIngredients();
    const response = h.response({
      status: 'success',
      results: ingredients,
    });
    return response;
  }

  async getIngredientById(request, h) {
    const { id } = request.params;
    const ingredient = await this.service.getIngredientById(id);
    const response = h.response({ ingredient });
    return response;
  }
}

module.exports = IngredientHandler;
