const Joi = require('joi');

const CreatorPayloadSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().required(),
    email : Joi.string().email().required(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    gender : Joi.string(),
    age : Joi.number(),
    url_image : Joi.string()
})

module.exports = {CreatorPayloadSchema};