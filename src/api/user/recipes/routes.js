const routes = (handler) => [
    {
        method: 'GET',
        path: '/recipes',
        handler: handler.getRecipesHandler
    },
    {
        method: 'GET',
        path: '/recipes/{id}',
        handler: handler.getRecipeByIdHandler
    },
    {
        method: 'GET',
        path: '/recipes/search',
        handler: handler.filteringRecipesHandler
    }
]
module.exports = routes;