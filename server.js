var path             = require('path'),
    logger           = require('morgan'),
    dotenv           = require('dotenv'),
    express          = require('express'),
    compression      = require('compression'),
    bodyParser       = require('body-parser'),
    cookieParser     = require('cookie-parser'),
    routes           = require('./server/router'),
    expressValidator = require('express-validator');

// Load environment variables from .env file
dotenv.load();

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client' , 'dist')));


routes.all.forEach( aRoute => {
    app[aRoute.method](aRoute.route, aRoute.action);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
