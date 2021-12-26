const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'users',
    version: '1.0.0',
    register: async (server, { service }) => {
        const handler = new UsersHandler(service);
        server.route(routes(handler));
    }
}