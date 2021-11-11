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
];

module.exports = routes;