const RatingHandler = require('./handler')
const routes = require('./routes')

module.exports = {
    name: 'userratings',
    version: '1.0.0',
    register: async (server, { service }) => {
        const handler = new RatingHandler(service)
        server.route(routes(handler))
    }
}