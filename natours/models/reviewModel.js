// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'A review must have a text'],
            maxlength: [500, "A review can't be more than 500 characters"]
        },
        rating: {
            type: Number,
            required: [true, 'A review must have a rating'],
            max: [5, 'Rating must be 5 or below 5'],
            min: [1, 'Rating must be more than one']
        },
        tour: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
            required: [true, 'Review must belong to a tour']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to an user']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

reviewSchema.pre(/^find/, function(next) {
    //this.populate({
    //    path: 'tour',
    //    select: 'name'
    //}).populate({
    //    path: 'user',
    //    select: 'name photo'
    //});
    this.populate({
        path: 'user',
        select: 'name photo'
    });

    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
