const autoBind = require('auto-bind');

class CuisineHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getCuisines(request, h) {
    const cuisines = await this.service.getAllCuisines();
    const response = h.response({
      status: 'success',
      results: cuisines,
    });
    return response;
  }

  async getCuisineById(request, h) {
    const cuisine = await this.service.getCuisineById(request.params.id);
    const response = h.response(cuisine);
    return response;
  }
}

module.exports = CuisineHandler;
