const routes = (handler) => [
  {
    method: 'GET',
    path: '/ingredient',
    handler: handler.getAllIngredients,
  },
  {
    method: 'GET',
    path: '/ingredient/{id}',
    handler: handler.getIngredientById,
  },
];

module.exports = routes;
