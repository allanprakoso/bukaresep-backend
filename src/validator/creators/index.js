const InvariantError = require('../../common/exceptions/InvariantError');
const { CreatorPayloadSchema, CreatorUpdatePayloadSchema } = require('./schema');

const CreatorValidator = {
  validateCreatorPayload: (payload) => {
    const { error } = CreatorPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateUpdateCreatorPayload: (payload) => {
    const { error } = CreatorUpdatePayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = CreatorValidator;
