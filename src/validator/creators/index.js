const InvariantError = require('../../common/exceptions/InvariantError');
const { CreatorPayloadSchema }= require('./schema');

const CreatorValidator = {
    validateCreatorPayload: (payload) => {
        const { error } = CreatorPayloadSchema.validate(payload);
        if (error) {
            throw new InvariantError(error.message);
        }
    }
}

module.exports = CreatorValidator;