const Joi = require('joi');

const routes = (handler) => [
    {
        method: 'GET',
        path: '/creator/collections',
        handler: handler.getAllCollectionsHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Get creator collections',
            notes: 'Returns a list collections',
            tags: ['api']
        },

    },
    {
        method: 'GET',
        path: '/creator/collections/{id}',
        handler: handler.getCollectionByIdHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Get creator collections details',
            notes: 'Returns a information of collections',
            tags: ['api'],
        },
    },
    {
        method: 'POST',
        path: '/creator/collections',
        handler: handler.createCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Get creator collections',
            notes: 'Returns a list collections',
            tags: ['api'],
        },
    },
    {
        method: 'PUT',
        path: '/creator/collections/{id}',
        handler: handler.updateCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Edit creator collections',
            notes: 'Return status and message',
            tags: ['api'],
        },
    },
    {
        method: 'DELETE',
        path: '/creator/collections/{id}',
        handler: handler.deleteCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Remove creator collections',
            notes: 'Return status and messages',
            tags: ['api'],
        },
    },
    {
        method: 'GET',
        path: '/creator/collections/{id}/recipes',
        handler: handler.getRecipesByCollectionIdHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Remove recipe in creator collections',
            notes: 'Return list recipe',
            tags: ['api'],
        },
    },
    {
        method: 'POST',
        path: '/creator/collections/{id}/recipes',
        handler: handler.addRecipeToCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Get creator collections',
            notes: 'Returns a list collections',
            tags: ['api'],
        },
    },
    {
        method: 'DELETE',
        path: '/creator/collections/{id}/recipes/{recipe_id}',
        handler: handler.deleteRecipeFromCollectionHandler,
        options: {
            auth: 'bukaresep_jwt',
            description: 'Remove recipe from creator collections',
            notes: 'Return status and messages',
            tags: ['api'],
        },
    },
];

module.exports = routes;
