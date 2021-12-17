const routes = (handler) => [
  {
    method: 'GET',
    path: '/cuisine',
    handler: handler.getCuisines,
  },
  {
    method: 'GET',
    path: '/cuisine/{id}',
    handler: handler.getCuisineById,
  },
];

module.exports = routes;
