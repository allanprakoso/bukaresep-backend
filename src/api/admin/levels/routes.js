const routes = (handler) => [
  {
    method: 'GET',
    path: '/level',
    handler: handler.getLevels,
  },
  {
    method: 'GET',
    path: '/level/{id}',
    handler: handler.getLevelById,
  },
];

module.exports = routes;
