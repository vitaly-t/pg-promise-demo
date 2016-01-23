var express = require('express');
var db = require('./db').db;

var app = express();

var port = 3000;

app.listen(port, function () {
    console.log('pg-promise-demo is listening on port ' + port + '...');
});

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

app.get('/users/add', function (req, res) {
    var action = db.users.add(req.name, req.id);
    respond(action, res);
});

app.get('/users/total', function (req, res) {
    var action = db.users.total();
    respond(action, res);
});

// Generic response helper:
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
