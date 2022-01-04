const routes = (handler) => [
  {
    method: 'POST',
    path: '/creator/recipes',
    handler: handler.createRecipeHandler,
    options: {
      auth: 'bukaresep_jwt',
      description: 'Post recipe details',
      notes: 'Returns id',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/creator/recipes/drafts',
    handler: handler.getRecipesDrafted,
    options: {
      auth: 'bukaresep_jwt',
      description: 'Get recipe drafts',
      notes: 'Returns drafts recipe',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/creator/recipes/{id}',
    handler: handler.getRecipeById,
    options: {
      auth: 'bukaresep_jwt',
      description: 'Get recipe details',
      notes: 'Returns detail recipe',
      tags: ['api'],
    },
  },
  {
    method: 'PUT',
    path: '/creator/recipes/{id}',
    handler: handler.updateRecipeById,
    options: {
      auth: 'bukaresep_jwt',
      description: 'Edit recipe details',
      notes: 'Returns information',
      tags: ['api'],
    },
  },
  {
    method: 'DELETE',
    path: '/creator/recipes/{id}',
    handler: handler.deleteRecipeById,
    options: {
      auth: 'bukaresep_jwt',
      description: 'Delete recipe',
      notes: 'Returns information',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/creator/recipes',
    handler: handler.getAllRecipesPagination,
    options: {
      auth: 'bukaresep_jwt',
      description: 'Get recipes',
      notes: 'Returns List Recipe pagination',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/creator/recipes/search',
    handler: handler.searchRecipes,
    options: {
      auth: 'bukaresep_jwt',
      description: 'Search recipes',
      notes: 'Returns List Recipe pagination',
      tags: ['api'],
    },
  }
];

module.exports = routes;
