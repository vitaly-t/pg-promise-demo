var pgpLib = require('pg-promise');

// Helper for linking to external query files:
function sql(file) {
    return new pgpLib.QueryFile('./db/sql/' + file, {minify: true});
}

//////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an
// external SQL file or to keep it inline:
//
// - Size / complexity of the query, because having it in a separate file
//   will let you develop the query and see the immediate update without
//   having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple
//   versions commented out in the query file.
//
// In fact, the only reason one might want to keep a query inline within
// the code is to be able to easily see the relation between the query
// an its formatting parameters. However, this is very easy to overcome
// by using only Named Parameters for your query formatting.
//
// We import only a few queries here, while using the rest inline in the
// code, only to provide a diverse example here, but you may just as well
// put all of your queries into SQL files.
//////////////////////////////////////////////////////////////////////////

var sqlProvider = {
    users: {
        create: sql('users/create.sql'),
        empty: sql('users/empty.sql'),
        init: sql('users/init.sql'),
        drop: sql('users/drop.sql'),
    },
    products: {
        create: sql('products/create.sql'),
        empty: sql('products/empty.sql'),
        init: sql('products/init.sql'),
        drop: sql('products/drop.sql')
    }
};

module.exports = sqlProvider;
