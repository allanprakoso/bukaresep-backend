const autoBind = require('auto-bind');

class CreatorHandler {
    constructor(service, validator) {
        this.service = service;
        this.validator = validator;
        autoBind(this);
    }

    async createCreatorHandler(request, h) {
        this.validator.validateCreatorPayload(request.payload);
        const { username , password, email, gender, age, front_name, last_name } = request.payload;
        // TODO : Create Mapping Json Username & email tolowercase
        const creator_id = await this.service.addCreator({ username: username.toString().toLowerCase(), password, email: email.toString().toLowerCase(), gender, age, front_name, last_name });

        const response = h.response({
            status: 'success',
            message: 'creator created successfully',
            data: { creator_id },
        });
        response.code(201);
        return response;
    };

    async getCreatorByIdHandler(request) {
        const { id } = request.params;
        const creator = await this.service.getCreatorById(id);
        return {
            status: 'success',
            data: { creator },
        };
    }
}

module.exports = CreatorHandler;