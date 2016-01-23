var pgpLib = require('pg-promise');

function sql(file) {
    return new pgpLib.QueryFile('./db/sql/' + file, {minify: true});
}

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
