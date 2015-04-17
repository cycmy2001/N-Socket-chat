"use strict";
var pkg = require('../pkg/pkg');
var local=require('../routes/local');
module.exports = function (app, express) {

    // settings
    app.set('env', pkg.sys.nodeEnv);
    app.set('port', app.config.server.port);
    app.set('views', pkg.sys.path.join(app.config.root, 'app/views'));
    app.set('view engine', 'jade');

    app.enable('trust proxy');
    app.disable('x-powered-by');

    // Express use middlewares
    app.use(express.static(pkg.sys.path.normalize(app.config.root + '/public')));
    app.use(pkg.sys.favicon(app.config.root + '/public/favicon.ico'));
    app.use(pkg.sys.morgan('dev'));
    app.use(pkg.sys.bodyParser.urlencoded({extended: true}));
    app.use(pkg.sys.bodyParser.json());

    /** ROUTES Apps */
    app.use('/',local);

    // will print stacktrace
    app.use(pkg.sys.compression({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9
    }));
    app.use(pkg.sys.errorHandler());

};
