const mongoose = require('mongoose')
const Category = require('../models/Category')

module.exports = async function (req, res, next) {
    const { categoryId } = req.params

    try {
        let category = await Category.findById(categoryId)

        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(403).json({
                error: "Category not found"
            })
        }
    
        req.category = category
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error!")
    }

}