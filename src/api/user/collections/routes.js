const routes = (handler) => [
    {
        method: 'GET',
        path: '/user/collections',
        handler: handler.getAllCollectionsHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
    {
        method: 'GET',
        path: '/user/collections/{id}',
        handler: handler.getCollectionByIdHandler,
    },
    {
        method: 'POST',
        path: '/user/collections',
        handler: handler.createCollectionHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
    {
        method: 'PUT',
        path: '/user/collections/{id}',
        handler: handler.updateCollectionHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/collections/{id}',
        handler: handler.deleteCollectionHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
    {
        method: 'GET',
        path: '/user/collections/{id}/recipes',
        handler: handler.getRecipesByCollectionIdHandler,
    },
    {
        method: 'POST',
        path: '/user/collections/{id}/recipes',
        handler: handler.addRecipeToCollectionHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/collections/{id}/recipes/{recipe_id}',
        handler: handler.deleteRecipeFromCollectionHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
];

module.exports = routes;