const routes = (handler) => [
  {
    method: 'POST',
    path: '/creator/recipes',
    handler: handler.createRecipeHandler,
    options: {
      auth: 'bukaresep_jwt',
    },
  },
  {
    method: 'GET',
    path: '/creator/recipes/{id}',
    handler: handler.getRecipeById,
    options: {
      auth: 'bukaresep_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/creator/recipes/{id}',
    handler: handler.updateRecipeById,
    options: {
      auth: 'bukaresep_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/creator/recipes/{id}',
    handler: handler.deleteRecipeById,
    options: {
      auth: 'bukaresep_jwt',
    },
  },
  {
    method: 'GET',
    path: '/creator/recipes',
    handler: handler.getAllRecipesPagination,
    options: {
      auth: 'bukaresep_jwt',
    },
  },
  {
    method: 'GET',
    path: '/creator/recipes/search',
    handler: handler.searchRecipes,
    options: {
      auth: 'bukaresep_jwt',
    },
  }
];

module.exports = routes;
