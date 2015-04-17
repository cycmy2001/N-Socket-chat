"use strict";

module.exports = function (ROOT_PATH) {
    var config = {
        server: {
            port: 3000,
            hostname: 'localhost'
        },
        root: ROOT_PATH
    };
    return config;
};
