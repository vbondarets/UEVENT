const {OrganizationModel} = require('../models/userModel');
const ApiError = require("../helpers/error/ApiError");

class organizationController {
    
    async getAll(req, res, next) {
        try {
            OrganizationModel.findAll().then(resolve => {
                if(resolve.length > 0){
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async getById(req, res, next) {
        try {
            const {id} = req.params;
            OrganizationModel.findAll({
                where:{
                    organization_id: id
                }
            }).then(resolve => {
                if(resolve.length > 0){
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async getByCreator(req, res, next) {
        try {
            const {author_id} = req.body;
            OrganizationModel.findAll({
                where:{
                    author_id: author_id
                }
            }).then(resolve => {
                if(resolve.length > 0){
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async create(req, res, next) {
        try {
            const {author_id, name, email, location, description} = req.body;
            OrganizationModel.create({
                author_id, 
                name, 
                email, 
                location, 
                description
            }).then(() => {
                return res.json("Organization created");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async update(req, res, next) {
        try {
            const {organization_id, author_id, name, email, location, description} = req.body;
            OrganizationModel.update({ 
                name, 
                email, 
                location, 
                description
            }, {where: {
                organization_id: organization_id,
            }}).then(() => {
                return res.json("Organization updated");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.body;
            OrganizationModel.destroy({
                where:{
                    organization_id: id
                }
            }).then(() => {
                return res.json("Organization delited");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new organizationController();