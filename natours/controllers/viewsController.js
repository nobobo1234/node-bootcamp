const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
    const tours = await Tour.find();

    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if (!tour) {
        return next(new AppError('No tour found with that slug', 404));
    }

    res.status(200).render('tour', {
        title: tour.name,
        tour
    });
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in to your account'
    });
};
