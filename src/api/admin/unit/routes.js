const routes = (handler) => [
  {
    method: 'GET',
    path: '/unit',
    handler: handler.getUnit,
  },
  {
    method: 'GET',
    path: '/unit/{id}',
    handler: handler.getUnitById,
  },
];

module.exports = routes;
