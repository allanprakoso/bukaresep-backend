const IngredientHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'ingredient',
  version: '1.0.0',
  register: async (server, { service }) => {
    const ingredientHandler = new IngredientHandler(service);
    server.route(routes(ingredientHandler));
  },
};
