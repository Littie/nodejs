var express = require('express');
var fortune = require('./lib/fortune');

var app = express();

var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
var handlebarsSection = require('express-handlebars-sections');

handlebarsSection(handlebars);

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.locals.showTest = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

/**
 * Home page
 */
app.get('/', function (req, res) {
    res.render('home');
});

/**
 * About page
 */
app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

/**
 * 404 - page
 */
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

/**
 * 500 page
 */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express was started on localhost ' + app.get('port') + ' port');
});