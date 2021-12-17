const routes = (handler) => [
  {
    method: 'GET',
    path: '/creators/{id}',
    handler: handler.getCreatorByIdHandler,
  },
  {
    method: 'POST',
    path: '/creators',
    handler: handler.createCreatorHandler,
  },
  {
    method: 'PUT',
    path: '/creators/{id}',
    handler: handler.updateCreatorHandler,
  },
];

module.exports = routes;
