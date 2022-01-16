const routes = (handler) => [
    {
        method: 'POST',
        path: '/user/recipes/{recipeId}/ratings',
        handler: handler.createRatingHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
    {
        method: 'GET',
        path: '/user/recipes/{recipeId}/rating',
        handler: handler.getRatingRecipeUserHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
    {
        method: 'GET',
        path: '/recipes/{recipeId}/ratings',
        handler: handler.getRatingRecipeHandler
    },
    {
        method: 'PUT',
        path: '/user/recipes/{recipeId}/ratings',
        handler: handler.updateRatingRecipeHandler,
        options: {
            auth: {
                strategy: 'bukaresep_user_jwt'
            }
        }
    },
]

module.exports = routes;