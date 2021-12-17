const UploadsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { recipeService, profileService, validator }) => {
    const uploadsHandler = new UploadsHandler(recipeService, profileService, validator);
    server.route(routes(uploadsHandler));
  },
};
