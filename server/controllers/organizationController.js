const {OrganizationModel, OrganizationPostModel, OrganizationSubModel, UserModel} = require('../models/userModel');
const ApiError = require("../helpers/error/ApiError");
const uuid = require('uuid');
const path = require('path');
const notificationService = require('../services/notification/notificationMailService');

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
            const {id} = req.params;
            OrganizationModel.findAll({
                where:{
                    author_id: id
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
            const {author_id, name, email, location, description, img} = req.body;
            console.log(req.body);
            OrganizationModel.create({
                author_id, 
                name,   
                email, 
                img,
                location, 
                description
            }).then(() => {
                return res.json("Organization created");
            }).catch(error => {
                console.log("1")
                console.log(error)
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            console.log("2")
            console.log(error)
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async update(req, res, next) {
        try {
            const {organization_id, name, email, location, description} = req.body;
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
            const {id} = req.params;
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
    async getByOrganization(req, res, next) {
        try {
            const {id} = req.params;
            OrganizationPostModel.findAll({
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
    async createPost(req, res, next) {
        try {
            const {organization_id, text, header} = req.body;
            OrganizationPostModel.create({
                organization_id, 
                text,   
                header
            }).then(async () => {
                OrganizationSubModel.findAll({
                    where: {
                        organization_id
                    }
                }).then(async (subs) => {
                    if(subs.length > 0){
                        subs.forEach(async (sub) => {
                            const Org = await OrganizationModel.findOne({where: {organization_id}}).catch(error => {
                                console.log(error)
                            })
                            UserModel.findOne({
                                where: {
                                    user_id: sub.user_id
                                }
                            }).then((User) => {
                                notificationService({
                                    link: `http://localhost:3000/organizations/${organization_id}`,
                                    text: `Hello dear ${User.fullna}\n\nOrganization ${Org.name}\n publish a new post`,
                                    header: `Check new post`
                                }, User.email)
                            }).catch(error => {
                                console.log(error)
                            })
                        })
                    }
                })
                return res.json("Post created");
            }).catch(error => {
                console.log(error)
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            console.log(error)
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async updatePost(req, res, next) {
        try {
            const {text, header} = req.body;
            OrganizationPostModel.update({ 
                text, 
                header, 
            }, {where: {
                post_id: post_id,
            }}).then(() => {
                return res.json("Post updated");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async deletePost(req, res, next) {
        try {
            const {id} = req.params;
            OrganizationPostModel.destroy({
                where:{
                    post_id: id
                }
            }).then(() => {
                return res.json("Post delited");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async getSub(req, res, next) {
        try {
            const {organization_id, user_id} = req.body;
            OrganizationSubModel.findOne({
                where:{
                    organization_id,
                    user_id
                }
            }).then((sub) => {
                return res.json(sub);
            }).catch(error => {
                console.log(error)
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async createSub(req, res, next) {
        try {
            const {organization_id, user_id} = req.body;
            OrganizationSubModel.findOrCreate({
                where:{
                    organization_id,
                    user_id
                }
            }).then(() => {
                return res.json("Sub created");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async deleteSub(req, res, next) {
        try {
            const {organization_id, user_id} = req.body;
            OrganizationSubModel.destroy({
                where:{
                    organization_id,
                    user_id
                }
            }).then(() => {
                return res.json("Sub deleted");
            }).catch(error => {
                console.log(error);
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            console.log(error);
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new organizationController();