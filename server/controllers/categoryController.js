const {EventCategoryModel} = require('../models/eventModel');
const ApiError = require("../helpers/error/ApiError");

class categoryController {
    
    async getAll(req, res, next) {
        try {
            EventCategoryModel.findAll().then(resolve => {
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
            EventCategoryModel.findAll({
                where:{
                    category_id: id
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
            const {name} = req.body;
            EventCategoryModel.create({ 
                name
            }).then(() => {
                return res.json("Category created");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            }) 
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async update(req, res, next) {
        try {
            const {category_id, name} = req.body;
            EventCategoryModel.update({ 
                name
            }, {where: {
                category_id: category_id,
            }}).then(() => {
                return res.json("Category updated");
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
            EventCategoryModel.destroy({
                where:{
                    category_id: id
                }
            }).then(() => {
                return res.json("Category delited");
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new categoryController();