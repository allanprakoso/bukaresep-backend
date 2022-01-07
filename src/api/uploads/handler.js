const autoBind = require('auto-bind');
const { nanoid } = require('nanoid');

class UploadsHandler {
  constructor(recipeService, profileService, validator) {
    this._recipeService = recipeService;
    this._profileService = profileService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);
    const file = data.hapi.filename;
    const filename = +new Date() + nanoid(20) + file.substr(file.length - 5);
    const result = await this._recipeService.writeFile(data, filename);

    const response = h.response({
      status: 'success',
      data: {
        pictureUrl: `http://${process.env.IMAGE_URL}/recipe/${result}`,
      },
    });
    response.code(201);
    return response;
  }

  async postProfilePictureHandler(request, h) {
    const { data, id } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);
    const file = data.hapi.filename;
    const filename = id + file.substr(file.length - 5);
    const result = await this._profileService.writeFile(data, filename);

    const response = h.response({
      status: 'success',
      data: {
        pictureUrl: `http://${process.env.IMAGE_URL}/profile/${result}`,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
