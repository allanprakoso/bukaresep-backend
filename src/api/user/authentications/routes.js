const routes = (handler) => [
  {
    method: 'POST',
    path: '/user/authentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/user/authentications',
    handler: handler.putAuthenticationHandler,

  },
  {
    method: 'DELETE',
    path: '/user/authentications',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
