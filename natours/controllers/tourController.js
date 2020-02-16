const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.topToursAlias = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

exports.createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
    //  console.log(req.body);
    //    const newId = tours[tours.length - 1].id + 1;
    //    const newTour = { ...req.body, id: newId };
    //
    //    tours.push(newTour);
    //    fs.writeFile(
    //        `${__dirname}/../dev-data/data/tours-simple.json`,
    //        JSON.stringify(tours),
    //        err => {
    //            res.status(201).json({
    //                status: 'success',
    //                data: {
    //                    tour: newTour
    //                }
    //            });
    //        }
    //    );
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
    //    const id = Number(req.params.id);
    //    const tour = tours.find(el => el.id === id);
    //
    //    res.status(200).json({
    //        status: 'success',
    //        data: {
    //            tour
    //        }
    //    });
});

exports.updateTour = catchAsync(async (req, res, next) => {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedTour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: updatedTour
        }
    });
    //    const id = Number(req.params.id);
    //    const tour = tours.find(el => el.id === id);
    //
    //    const newTour = { ...tour, ...req.body };
    //
    //    tours[id] = newTour;
    //    fs.writeFile(
    //        `${__dirname}/../dev-data/data/tours-simple.json`,
    //        JSON.stringify(tours),
    //        err => {
    //            res.status(200).json({
    //                status: 'success',
    //                data: {
    //                    tour: newTour
    //                }
    //            });
    //        }
    //    );
});

exports.deleteTour = catchAsync(async (req, res, next) => {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
    //    const id = Number(req.params.id);
    //
    //    tours.splice(id, 1);
    //    fs.writeFile(
    //        `${__dirname}/../dev-data/data/tours-simple.json`,
    //        JSON.stringify(tours),
    //        err => {
    //            res.status(204).json({
    //                status: 'success',
    //                data: null
    //            });
    //        }
    //    );
});

exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numRatings: { $sum: '$ratingsQuantity' },
                numTours: { $sum: 1 },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { avgPrice: 1 }
        }
        //            {
        //                $match: { _id: { $ne: 'EASY' } }
        //            }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = Number(req.params.year);

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: { numTourStarts: -1 }
        },
        {
            $limit: 12
        }
    ]);

    res.status(200).json({
        status: 'success',
        results: plan.length,
        data: {
            plan
        }
    });
});
