const routes = (handler) => [
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getCategories,
  },
  {
    method: 'GET',
    path: '/categories/{id}',
    handler: handler.getCategoryById,
  },
];

module.exports = routes;
