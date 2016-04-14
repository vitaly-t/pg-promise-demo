import dbProvider = require('./db');

var pgp = dbProvider.pgp, db = dbProvider.db;

// The entire TypeScript layer works perfectly;
// No point rewriting the web server part.

db.task(t=>t.batch([
        t.users.total(),
        t.products.total()
    ]))
    .then(data=> {
        console.log(data);
    });
