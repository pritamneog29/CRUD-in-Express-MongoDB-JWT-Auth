const express = require("express");
const lists = require('./Routes/listing');
const users = require('./Routes/users');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const logger = require('morgan');
var jwt = require('jsonwebtoken');

// jwt secret token
app.set('secretKey', 'nodeRestApi');

// DB connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Listing', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.json({ "tutorial": "Build REST API with node.js" });
});

// public route
app.use('/users', users);

// private route
app.use('/listings', validateUser, lists);

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

// user validation
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.id = decoded.id;
            next();
        }
    });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});