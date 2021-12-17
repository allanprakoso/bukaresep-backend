const CuisineHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'cuisine',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new CuisineHandler(service);
    server.route(routes(handler));
  },
};
