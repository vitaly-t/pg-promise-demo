import * as express from 'express';

const app = express();

import db = require('./db');

// NOTE: We implement only GET handlers here, because:
//
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

// add a new user, if it doesn't exist yet, and return the object:
GET('/users/add/:name', req => {
    return db.task('add-user', t => {
        return t.users.findByName(req.params.name)
            .then(user => {
                return user || t.users.add(req.params.name);
            });
    });
});

// find a user by id:
GET('/users/find/:id', (req: any) => db.users.findById(req.params.id));

// remove a user by id:
GET('/users/remove/:id', (req: any) => db.users.remove(req.params.id));

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

// add a new user product, if it doesn't exist yet, and return the object:
GET('/products/add/:userId/:name', req => {
    return db.task('add-product', t => {
        return t.products.find(req.params)
            .then(product => {
                return product || t.products.add(req.params);
            });
    });
});

// find a product by user id + product name id:
GET('/products/find/:userId/:name', req => db.products.find(req.params));

// remove a product by id:
GET('/products/remove/:id', (req: any) => db.products.remove(req.params.id));

// get all products:
GET('/products/all', () => db.products.all());

// count all products:
GET('/products/total', () => db.products.total());

/////////////////////////////////////////////
// Express/server part;
/////////////////////////////////////////////

// Generic GET handler;
function GET(url: string, handler: (req: any) => any) {
    app.get(url, (req, res) => {
        handler(req)
            .then((data: any) => {
                res.json({
                    success: true,
                    data
                });
            })
            .catch((error: any) => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
    });
}

const port = 3000;

app.listen(port, () => {
    console.log('\nReady for GET requests on http://localhost:' + port);
});
