const routes = (handler) => [
  {
    method: 'POST',
    path: '/creator/authentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/creator/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/creator/authentications',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
