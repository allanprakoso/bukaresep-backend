const routes= (handler) => [
    {
        method: 'POST',
        path: '/users',
        handler: handler.createUserHandler
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: handler.getUserHandler
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: handler.updateUserHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
]

module.exports = routes