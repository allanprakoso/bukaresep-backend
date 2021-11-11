require('dotenv').config();
const Hapi = require('@hapi/hapi');
const creators = require('./api/creators');

const ClientError = require('./common/exceptions/ClientError');
const CreatorsService = require('./services/postgres/CreatorsService');
const creatorsValidator = require('./validator/creators');

// 

const init = async () => {

    const creatorsService = new CreatorsService();

    const server = Hapi.Server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    })

    await server.register([{
        plugin: creators,
        options: {
            service: creatorsService,
            validator: creatorsValidator,
        }
    }])

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