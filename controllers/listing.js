const listingModel = require('../models/listing');

module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        listingModel.findById(req.params.id, function (err, listingInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Listing found!!!", data: { lists: listingInfo } });
            }
        });
    },

    getAll: function (req, res, next) {
        let listingList = [];
        listingModel.find({}, function (err, listings) {
            if (err) {
                next(err);
            } else {
                for (let lists of listings) {
                    listingList.push({ id: lists.id, name: lists.Name, image: lists.Image, details: lists.Details, segment: lists.Segment });
                }
                res.json({ status: "success", message: "Listings found!!!", data: { lists: listingList } });

            }
        });
    },

    updateById: function (req, res, next) {
        listingModel.findByIdAndUpdate(req.params.id, { name: req.body.Name }, function (err, listingInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Listing updated successfully!!!", data: null });
            }
        });
    },

    deleteById: function (req, res, next) {
        listingModel.findByIdAndRemove(req.params.id, function (err, listingInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Listing deleted successfully!!!", data: null });
            }
        });
    },
    
    create: function (req, res, next) {
        listingModel.create({ id: req.body.id, Name: req.body.Name, Image: req.body.Image, Details: req.body.Details, Segment: req.body.Segment }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Listing added successfully!!!", data: null });
        });
    },
}