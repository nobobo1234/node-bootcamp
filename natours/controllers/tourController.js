const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.topToursAlias = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

exports.getAllTours = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
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
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({ _id: req.params.id })

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
    //    const id = Number(req.params.id);
    //    const tour = tours.find(el => el.id === id);
    //
    //    res.status(200).json({
    //        status: 'success',
    //        data: {
    //            tour
    //        }
    //    });
};

exports.updateTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
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
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
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
};

exports.getTourStats = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getMonthlyPlan = async (req, res) => {
    try {
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
        })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        }) 
    }
}
