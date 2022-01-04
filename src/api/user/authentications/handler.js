const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;

    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    const { username, password } = request.payload;
    const user = await this._usersService.verifyUserCredentials(username, password);
    const accessToken = await this._tokenManager.generateAccessToken({ user });
    const refreshToken = await this._tokenManager.generateRefreshToken({ user });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication successful',
      data: { accessToken, refreshToken },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    const { refreshToken } = request.payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const { user } = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = await this._tokenManager.generateAccessToken({ user });

    return {
      status: 'success',
      message: 'Authentication successful update',
      data: { accessToken },
    };
  }

  async deleteAuthenticationHandler(request) {
    const { refreshToken } = request.payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',

    };
  }
}

module.exports = AuthenticationsHandler;
