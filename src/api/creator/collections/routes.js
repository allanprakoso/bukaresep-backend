const routes = (handler) => [
    {
        method: 'GET',
        path: '/creator/collections',
        handler: handler.getAllCollectionsHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
    {
        method: 'GET',
        path: '/creator/collections/{id}',
        handler: handler.getCollectionByIdHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
    {
        method: 'POST',
        path: '/creator/collections',
        handler: handler.createCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
    {
        method: 'PUT',
        path: '/creator/collections/{id}',
        handler: handler.updateCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/creator/collections/{id}',
        handler: handler.deleteCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
    {
        method: 'GET',
        path: '/creator/collections/{id}/recipes',
        handler: handler.getRecipesByCollectionIdHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
    {
        method: 'POST',
        path: '/creator/collections/{id}/recipes',
        handler: handler.addRecipeToCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/creator/collections/{id}/recipes/{recipe_id}',
        handler: handler.deleteRecipeFromCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
        },
    },
];

module.exports = routes;