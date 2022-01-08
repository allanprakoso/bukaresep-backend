const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/recipe',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        maxBytes: 1000 * 1000 * 5,
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'POST',
    path: '/upload/profile',
    handler: handler.postProfilePictureHandler,
    options: {
      payload: {
        maxBytes: 1000 * 1000 * 5,
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },

  {
    method: 'GET',
    path: '/profile/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file/profile'),
      },
    },
  },

  {
    method: 'GET',
    path: '/recipe/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file/recipe'),
      },
    },
  },
];

module.exports = routes;
