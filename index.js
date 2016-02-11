'use strict';

var db = require('./db').db;

var express = require('express');
var app = express();

//////////////////////////////////////////////
// Users Web API
//////////////////////////////////////////////

// create table Users:
app.get('/users/create', function (req, res) {
    var action = db.users.create();
    respond(action, res);
});

// add some initial records:
app.get('/users/init', function (req, res) {
    var action = db.users.init();
    respond(action, res);
});

// remove all records from the table:
app.get('/users/empty', function (req, res) {
    var action = db.users.empty();
    respond(action, res);
});

// drop the table:
app.get('/users/drop', function (req, res) {
    var action = db.users.drop();
    respond(action, res);
});

// add a new user with name:
app.get('/users/add/:name', function (req, res) {
    var action = db.users.add(req.params.name);
    respond(action, res);
});

// find a user by id:
app.get('/users/find/:id', function (req, res) {
    var action = db.users.find(parseInt(req.params.id));
    respond(action, res);
});

// remove a user by id:
app.get('/users/remove/:id', function (req, res) {
    var action = db.users.remove(parseInt(req.params.id));
    respond(action, res);
});

// get all users:
app.get('/users/all', function (req, res) {
    var action = db.users.all();
    respond(action, res);
});

// count all users:
app.get('/users/total', function (req, res) {
    var action = db.users.total();
    respond(action, res);
});

//////////////////////////////////////////////
// Products Web API
//////////////////////////////////////////////

// create table Products:
app.get('/products/create', function (req, res) {
    var action = db.products.create();
    respond(action, res);
});

// drop the table:
app.get('/products/drop', function (req, res) {
    var action = db.products.drop();
    respond(action, res);
});

// remove all products:
app.get('/products/empty', function (req, res) {
    var action = db.products.empty();
    respond(action, res);
});

// add a new product with user Id and name:
app.get('/products/add/:userId/:name', function (req, res) {
    var values = {
        // handle errors here as needed;
        userId: parseInt(req.params.userId),
        name: req.params.name
    };
    var action = db.products.add(values);
    respond(action, res);
});

// find a product by id:
app.get('/products/find/:id', function (req, res) {
    var action = db.products.find(parseInt(req.params.id));
    respond(action, res);
});

// remove a product by id:
app.get('/products/remove/:id', function (req, res) {
    var action = db.products.remove(parseInt(req.params.id));
    respond(action, res);
});

// get all products:
app.get('/products/all', function (req, res) {
    var action = db.products.all();
    respond(action, res);
});

// count all products:
app.get('/products/total', function (req, res) {
    var action = db.products.total();
    respond(action, res);
});

///////////////////////////////////////
// Generic Response Helper
function respond(action, res) {
    action
        .then(function (data) {
            res.json({
                success: true,
                data: data
            });
        })
        .catch(function (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        });
}

//////////////////////////////////////
// Server Initialization:
var port = 3000;

app.listen(port, function () {
    console.log('pg-promise-demo is listening on port ' + port + '...');
});
