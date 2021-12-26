const autoBind = require('auto-bind');

class UsersHandler {
    constructor(service) {
        this.service = service;
        autoBind(this);
    }

    async createUserHandler(request, h) {
        const user_id = await this.service.addUser(request.payload);
        const response = h.response({
            status: 'success',
            message: 'user created successfully',
            data: { user_id },
        });
        response.code(201);
        return response;
    }

    async getUserHandler(request, h) {
        const { id } = request.params;
        const user = await this.service.getUserById(id);

        return h.response({ user });
    }

    async updateUserHandler(request, h) {
        const { id } = request.params;
        await this.service.updateUser(id, request.payload);
        const response = h.response({
            status: 'success',
            message: 'user update successfully'
        })
        return response;
    }
}

module.exports = UsersHandler;