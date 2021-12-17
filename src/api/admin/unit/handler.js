const autoBind = require('auto-bind');

class UnitHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getUnit(request, h) {
    const Unit = await this.service.getAllUnit();
    const response = h.response({
      status: 'success',
      results: Unit,
    });
    return response;
  }

  async getUnitById(request, h) {
    const Unit = await this.service.getUnitById(request.params.id);
    const response = h.response(Unit);
    return response;
  }
}

module.exports = UnitHandler;
