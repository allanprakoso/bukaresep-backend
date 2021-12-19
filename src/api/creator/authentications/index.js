const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    creatorsService,
    tokenManager,
  }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      creatorsService,
      tokenManager);
    server.route(routes(authenticationsHandler));
  },
};
