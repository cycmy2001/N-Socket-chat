"use strict";
exports.sys= {
    express:require('express'),
    fs:require('fs'),
    http:require('http'),
    querystring:require('querystring'),
    path:require('path'),
    util:require('util'),
    morgan:require('morgan'),
    url:require('url'),
    favicon:require('serve-favicon'),
    bodyParser:require('body-parser'),
    errorHandler:require('errorhandler'),
    compression:require('compression'),
    lodash:require('lodash'),
    nodeEnv:process.env.NODE_ENV || 'development',
    uuid:require('node-uuid'),
    socketio:require("socket.io"),
    packageJson:require('../../package.json')

};




