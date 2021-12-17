const routes = (handler) => [
  {
    method: 'POST',
    path: '/recipes',
    handler: handler.createRecipeHandler,
  },
  {
    method: 'GET',
    path: '/recipes/{id}',
    handler: handler.getRecipeById
  },
  {
    method: 'PUT',
    path: '/recipes/{id}',
    handler: handler.updateRecipeById
  },
  {
    method: 'DELETE',
    path: '/recipes/{id}',
    handler: handler.deleteRecipeById
  }
];

module.exports = routes;
