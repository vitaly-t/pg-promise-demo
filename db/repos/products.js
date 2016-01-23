module.exports = function (obj) {
    return {
        add: function (name, active) {
            return obj.one("INSERT INTO users VALUES($1, $2) RETURNING id", [name, active]);
        }
    };
};
