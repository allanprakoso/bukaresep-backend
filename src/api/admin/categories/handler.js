const autoBind = require('auto-bind');

class CategoryHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getCategories(request, h) {
    const categories = await this.service.getAllCategories();
    const response = h.response({
      status: 'success',
      results: categories,
    });
    return response;
  }

  async getCategoryById(request, h) {
    const category = await this.service.getCategoryById(request.params.id);
    const response = h.response(category);
    return response;
  }
}

module.exports = CategoryHandler;
