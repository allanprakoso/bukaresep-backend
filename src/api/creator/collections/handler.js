const autoBind = require("auto-bind");

class CollectionsHandler {
    constructor(service) {
        this.service = service;
        autoBind(this);
    }

    async createCollectionHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const collection_id = await this.service.addCollection(credentialId, request.payload);
        const response = h.response({
            status: 'success',
            message: 'collection created successfully',
            data: { collection_id },
        });
        response.code(201);
        return response;
    }

    async updateCollectionHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const collection_id = request.params.id;
        const collection = await this.service.updateCollection({ collection_id, creator_id: credentialId }, request.payload);
        const response = h.response({
            status: 'success',
            message: 'collection updated successfully',
            data: { collection },
        });
        response.code(200);
        return response;
    }

    async getCollectionByIdHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const collection = await this.service.getCollectionById(request.params.id);
        const response = h.response({ collection });
        response.code(200);
        return response;
    }

    async deleteCollectionHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const collection_id = request.params.id;
        await this.service.deleteCollection({ collection_id, credentialId });
        const response = h.response({
            status: 'success',
            message: 'collection deleted successfully',
        });
        response.code(200);
        return response;
    }

    async getAllCollectionsHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const collections = await this.service.getCollections(credentialId);
        const response = h.response({ collections });
        response.code(200);
        return response;
    }

    async getRecipesByCollectionIdHandler(request, h) {
        const collection_id = request.params.id;
        const recipes = await this.service.getRecipesByCollectionId(collection_id);
        const response = h.response({ recipes });
        response.code(200);
        return response;
    }

    async addRecipeToCollectionHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const collection_id = request.params.id;
        const recipe_id = request.payload.recipe_id;

        await this.service.addRecipeToCollection({ collection_id, recipe_id, creator_id: credentialId });
        const response = h.response({
            status: 'success',
            message: 'recipe added to collection successfully',
        });
        response.code(200);
        return response;
    }

    async deleteRecipeFromCollectionHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const collection_id = request.params.id;
        const recipe_id = request.params.recipe_id;

        await this.service.removeRecipeFromCollection({ collection_id, recipe_id, creator_id: credentialId });
        const response = h.response({
            status: 'success',
            message: 'recipe removed from collection successfully',
        });
        response.code(200);
        return response;
    }
}
module.exports = CollectionsHandler;