const CreatorHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'creators',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new CreatorHandler(service, validator);
    server.route(routes(handler));
  },
};
