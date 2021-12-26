const CollectionsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'usercollections',
    version: '1.0.0',
    register: async (server, { service }) => {
        const handler = new CollectionsHandler(service);
        server.route(routes(handler));
    }
};