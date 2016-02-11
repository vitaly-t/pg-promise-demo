'use strict';

var db = require('./db').db;

var express = require('express');
var app = express();

//////////////////////////////////////////////
// Users Web API
//////////////////////////////////////////////

// create table Users:
GET('/users/create', () => db.users.create());

// add some initial records:
GET('/users/init', () => db.users.init());

// remove all records from the table:
GET('/users/empty', () => db.users.empty());

// drop the table:
GET('/users/drop', () => db.users.drop());

// add a new user with name:
GET('/users/add/:name', req => db.users.add(req.params.name));

// find a user by id:
GET('/users/find/:id', req => db.users.find(parseInt(req.params.id)));

// remove a user by id:
GET('/users/remove/:id', req => db.users.remove(parseInt(req.params.id)));

// get all users:
GET('/users/all', () => db.users.all());

// count all users:
GET('/users/total', () => db.users.total());

//////////////////////////////////////////////
// Products Web API
//////////////////////////////////////////////

// create table Products:
GET('/products/create', () => db.products.create());

// drop the table:
GET('/products/drop', () => db.products.drop());

// remove all products:
GET('/products/empty', () => db.products.empty());

// add a new product with user Id and name:
GET('/products/add/:userId/:name', req => db.products.add({
    // handle errors here as needed;
    userId: parseInt(req.params.userId),
    name: req.params.name
}));

// find a product by id:
GET('/products/find/:id', req => db.products.find(parseInt(req.params.id)));

// remove a product by id:
GET('/products/remove/:id', req => db.products.remove(parseInt(req.params.id)));

// get all products:
GET('/products/all', () => db.products.all());

// count all products:
GET('/products/total', () => db.products.total());

/////////////////////////////////////////////
// Express/server part;
/////////////////////////////////////////////

// Generic GET handler;
function GET(url, handler) {
    app.get(url, (req, res) => {
        let action = handler(req);
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
    });
}

var port = 3000;

app.listen(port, function () {
    console.log('\nThe demo app is listening on HTTP port ' + port + ';');
    console.log('Ready for GET requests on http://localhost:' + port + '/...');
});
