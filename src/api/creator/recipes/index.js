const RecipeHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'recipes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new RecipeHandler(service);
    server.route(routes(handler));
  },
};
