var pkg = require('../pkg/pkg');
var Route = pkg.sys.express.Router();
var config = require('../config/config');
Route
    .get('/chat',function(req, res) {
        res.render('chat',{port:config.server.port});
    })
    .get('/',function(req, res) {
        res.redirect('/chat');
    });
module.exports = Route;