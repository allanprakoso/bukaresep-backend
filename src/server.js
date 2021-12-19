require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

const ClientError = require('./common/exceptions/ClientError');

const creators = require('./api/creator/accounts');
const CreatorsService = require('./services/postgres/CreatorsService');
const creatorsValidator = require('./validator/creators');

const cuisines = require('./api/admin/cuisines');
const CuisinesService = require('./services/postgres/CuisinesService');

const categories = require('./api/admin/categories');
const CategoriesService = require('./services/postgres/CategoriesService');

const levels = require('./api/admin/levels');
const LevelsService = require('./services/postgres/LevelsService');

const unit = require('./api/admin/unit');
const UnitService = require('./services/postgres/UnitService');

const ingredients = require('./api/admin/ingredients');
const IngredientsService = require('./services/postgres/IngredientsService');

const creatorCollections = require('./api/creator/collections');
const CreatorCollectionService =require('./services/postgres/CreatorCollectionsService');
//

// uploads
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

const recipes = require('./api/creator/recipes');
const RecipesService = require('./services/postgres/RecipesService');


// authentications
const creatorAuthentications = require('./api/creator/authentications');
const CreatorAuthenticationService = require('./services/postgres/CreatorAuthenticationService');
const TokenManager = require('./common/tokenize/TokenManager');

const init = async () => {
  //? CREATOR
  const creatorAuthenticationsService = new CreatorAuthenticationService();
  const creatorsService = new CreatorsService();
  const recipesService = new RecipesService();
  const creatorCollectionService = new CreatorCollectionService();

  // ? ADMIN
  const cuisinesService = new CuisinesService();
  const categoriesService = new CategoriesService();
  const levelsService = new LevelsService();
  const unitService = new UnitService();
  const ingredientsService = new IngredientsService();

  // ? UPLOADS
  const storageServiceRecipe = new StorageService(path.resolve(__dirname, 'api/uploads/file/recipe'));
  const storageServiceProfile = new StorageService(path.resolve(__dirname, 'api/uploads/file/profile'));

  const server = Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('bukaresep_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });


  await server.register([
    {
      plugin: creatorAuthentications,
      options: {
        authenticationsService: creatorAuthenticationsService,
        creatorsService: creatorsService,
        tokenManager: TokenManager,
      }
    }
    ,
    {
    plugin: creators,
    options: {
      service: creatorsService,
      validator: creatorsValidator,
    },
  },
  {
    plugin: creatorCollections,
    options: {
      service: creatorCollectionService,
    },
  },
  {
    plugin: cuisines,
    options: {
      service: cuisinesService,
    },
  },
  {
    plugin: categories,
    options: {
      service: categoriesService,
    },
  },
  {
    plugin: levels,
    options: {
      service: levelsService,
    },
  },
  {
    plugin: unit,
    options: {
      service: unitService,
    },
  },
  {
    plugin: ingredients,
    options: {
      service: ingredientsService,
    },
  },

  {
    plugin: uploads,
    options: {
      recipeService: storageServiceRecipe,
      profileService: storageServiceProfile,
      validator: UploadsValidator,
    },
  },
  {
    plugin: recipes,
    options: { service: recipesService },
  },
  ]);

  await server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return response.continue || response;
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
