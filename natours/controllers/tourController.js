const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
    res.status(200).json({
        requestedAt: req.requestTime,
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
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
            status: fail,
            message: error
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

exports.getTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
