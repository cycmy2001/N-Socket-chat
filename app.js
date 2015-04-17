var pkg = require('./app/pkg/pkg');
var express  = pkg.sys.express;
var config   = require(__dirname + '/app/config/config');
var app      = express();
app.config = config;
// express settings
require('./app/config/express')(app, express);
module.exports = app;
