const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'user_authentications',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    usersService,
    tokenManager,
  }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      tokenManager);
    server.route(routes(authenticationsHandler));
  },
};
