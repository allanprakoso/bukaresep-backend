const LevelsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'levels',
  version: '1.0.0',
  register: async (server, { service }) => {
    const levelsHandler = new LevelsHandler(service);
    server.route(routes(levelsHandler));
  },
};
