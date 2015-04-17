"use strict";

module.exports = function (ROOT_PATH) {
    var config = {
        server: {
            port: process.env.PORT || 3001,
            hostname: process.env.HOSTNAME || '127.0.0.1'
        },
        root: ROOT_PATH
    };
    return config;
};