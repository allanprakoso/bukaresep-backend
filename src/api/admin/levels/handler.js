const autoBind = require('auto-bind');

class LevelHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getLevels(request, h) {
    const levels = await this.service.getAllLevels();
    const response = h.response({
      status: 'success',
      results: levels,
    });
    return response;
  }

  async getLevelById(request, h) {
    const level = await this.service.getLevelById(request.params.id);
    const response = h.response(level);
    return response;
  }
}

module.exports = LevelHandler;
