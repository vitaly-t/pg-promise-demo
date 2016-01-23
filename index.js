var promise = require('bluebird');
var express = require('express');
var db = require('./db').db;

var app = express();
var port = 3000;

app.listen(port, function () {
    console.log('pg-promise-demo is listening on port ' + port + '...');
});

//////////////////////////////////////////////
// Users Web API:
//////////////////////////////////////////////

app.get('/users/create', function (req, res) {
    var action = db.users.create();
    respond(action, res);
});

app.get('/users/init', function (req, res) {
    var action = db.users.init();
    respond(action, res);
});

app.get('/users/empty', function (req, res) {
    var action = db.users.empty();
    respond(action, res);
});

app.get('/users/drop', function (req, res) {
    var action = db.users.drop();
    respond(action, res);
});

app.get('/users/add/:name', function (req, res) {
    var action = db.users.add(req.params.name);
    respond(action, res);
});

app.get('/users/find/:id', function (req, res) {
    var action = db.users.find(req.params.id);
    respond(action, res);
});

app.get('/users/remove/:id', function (req, res) {
    var action = db.users.remove(req.params.id);
    respond(action, res);
});

app.get('/users/all', function (req, res) {
    var action = db.users.all();
    respond(action, res);
});


app.get('/users/total', function (req, res) {
    var action = db.users.total();
    respond(action, res);
});

//////////////////////////////////////////////
// Products Web API:
//////////////////////////////////////////////

app.get('/products/create', function (req, res) {
    var action = db.products.create();
    respond(action, res);
});

app.get('/products/drop', function (req, res) {
    var action = db.products.drop();
    respond(action, res);
});

app.get('/products/empty', function (req, res) {
    var action = db.products.empty();
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
