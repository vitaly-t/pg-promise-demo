/// <reference path='../typings/index.d.ts' />

import * as express from 'express';
var app = express();

import dbProvider = require('./db');
var db = dbProvider.db;

// Note that we implement only GET handlers here, because:
// 1. This demo is to be tested by typing URL-s manually in the browser;
// 2. The demo's focus is on a proper database layer, not a web server.

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
GET('/users/add/:name', (req:any) => db.users.add(req.params.name));

// find a user by id:
GET('/users/find/:id', (req:any) => db.users.find(parseInt(req.params.id)));

// remove a user by id:
GET('/users/remove/:id', (req:any) => db.users.remove(parseInt(req.params.id)));

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
GET('/products/add/:userId/:name', (req:any) => db.products.add({
    userId: parseInt(req.params.userId),
    name: req.params.name
}));

// find a product by id:
GET('/products/find/:id', (req:any) => db.products.find(parseInt(req.params.id)));

// remove a product by id:
GET('/products/remove/:id', (req:any) => db.products.remove(parseInt(req.params.id)));

// get all products:
GET('/products/all', () => db.products.all());

// count all products:
GET('/products/total', () => db.products.total());

/////////////////////////////////////////////
// Express/server part;
/////////////////////////////////////////////

// Generic GET handler;
function GET(url:string, handler:(req:any)=>any) {
    app.get(url, (req, res) => {
        handler(req)
            .then((data:any) => {
                res.json({
                    success: true,
                    data
                });
            })
            .catch((error:any) => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
    });
}

var port = 3000;

app.listen(port, () => {
    console.log('\nReady for GET requests on http://localhost:' + port);
});
