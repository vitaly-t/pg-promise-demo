var pgpLib = require('pg-promise');

function sql(file) {
    return new pgpLib.QueryFile('../sql/' + file, {minify: true});
}

var sqlProvider = {
    users: {
        create: sql('users/create.sql'),
        init: sql('users/init.sql')
    },
    products: {
        create: sql('products/create.sql'),
        init: sql('products/init.sql')
    }
};

module.exports = sqlProvider;
