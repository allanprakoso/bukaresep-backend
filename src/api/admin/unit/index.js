const UnitHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'unit',
  version: '1.0.0',
  register: async (server, { service }) => {
    const unitHandler = new UnitHandler(service);
    server.route(routes(unitHandler));
  },
};
