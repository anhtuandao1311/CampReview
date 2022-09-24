const joi = require('joi');

module.exports.campgroundSchema = joi.object({ // use dot when exporting more than one
    campground: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().required(),
        location: joi.string().required(),
        description: joi.string().required()
    }).required()
}) // server-side checking


module.exports.reviewSchema = joi.object({ // use dot when exporting more than one
    review: joi.object({
        body: joi.string().required(),
        rating: joi.number().required().min(1).max(5)
    }).required()
})