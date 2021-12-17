const CategoryHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'categories',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new CategoryHandler(service);
    server.route(routes(handler));
  },
};
